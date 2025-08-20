import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CompetitiveStatistics } from '../features/drill-engine/player-panel/player-panel.component';

export enum ConnectionState {
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  Reconnecting = 'Reconnecting'
}

export interface PlayerStatistics {
  userId: string;
  wpm: number;
  accuracy: number;
  wordsCompleted: number;
  totalWords: number;
  completionPercentage: number;
  timestamp: Date;
}

export interface Player {
  userId: string;
  username: string;
  level: number;
  competitiveRank?: string; // competitive rank (Bronze, Silver, Gold, etc.)
  state: 'Connected' | 'Ready' | 'Typing' | 'Finished' | 'Disconnected';
  statistics?: PlayerStatistics;
  isCreator?: boolean;
  isReady?: boolean; // New property from backend RoomPlayer entity
  joinedAt?: Date; // New property from backend RoomPlayer entity
  competitiveStats?: CompetitiveStatistics; // competitive drill statistics
}

export interface Room {
  roomId: string;
  roomCode: string;
  createdBy: string;
  state: 'Waiting' | 'Ready' | 'InProgress' | 'Finished';
  availability: 'Available' | 'Full';
  players: Player[];
  drillSettings: {
    type: 'Timed' | 'Marathon';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: number;
    length?: number;
  };
  drillText?: string[];
  activeCompetitiveDrillId?: string; // New property from backend
  associatedCompetitiveDrillIds?: string[]; // New property from backend
}

export interface DrillSettings {
  type: CompetitiveDrillType;
  difficulty: DrillDifficulty;
  duration?: number;
  length?: number;
}

export interface CreateRoomRequest {
  type: CompetitiveDrillType;
  difficulty: DrillDifficulty;
  duration?: number;
  length?: number;
}

export enum CompetitiveDrillType {
  Timed = 'Timed',
  Marathon = 'Marathon'
}

export enum DrillDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface CompetitiveDrillResults {
  roomId: string;
  winnerId: string;
  winnerUsername: string;
  playerResults: {
    userId: string;
    username: string;
    wpm: number;
    accuracy: number;
    position: number;
    pointsChange: number;
    previousCompetitivePoints?: number;
    newCompetitivePoints?: number;
    previousCompetitiveRank?: string;
    newCompetitiveRank?: string;
    hasLeveledUp?: boolean;
    pointsToNextRank?: number;
  }[];
  startedAt: Date;
  endedAt: Date;
}

export interface ICompetitiveDrillClient {
  // room management
  roomCreated(roomId: string, roomCode: string): void;
  roomJoined(roomId: string, roomCode: string): void;
  roomInfo(roomId: string, roomCode: string, createdBy: string): void;
  roomDisbanded(roomId: string, reason: string): void;
  
  // player management
  playerJoin(roomId: string, userId: string, username: string, level: number, isCreator?: boolean): void;
  playerLeave(roomId: string, userId: string): void;
  playerReady(roomId: string, userId: string, isReady: boolean): void;
  playerStatisticsUpdate(roomId: string, statistics: any[]): void;
  allPlayersCompleted(roomId: string): void;

  // drill lifecycle
  startDrill(roomId: string, drillText: string[]): void;
  beginDrill(roomId: string, drillText: string[]): void;
  endDrill(roomId: string, results: CompetitiveDrillResults): void;
  waitingForOtherPlayers(finishedCount: number, totalCount: number): void;
  
  // continue after drill events
  waitingForPlayersToContinue(roomCode: string, continuedCount: number, totalCount: number): void;
  allPlayersContinued(roomCode: string): void;
  
  // misc
  playerAFK(roomId: string, userId: string): void;
  afkWarning(roomId: string, userId: string, timeoutSeconds: number): void;
  playerKicked(roomCode: string, reason: string): void;
  countdown(roomId: string, countdown: number): void;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection?: HubConnection;
  private _connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.Disconnected);
  private heartbeatInterval?: any;
  private lastHeartbeatTime = 0;
  
  // event subjects for competitive drill events
  private roomJoined$ = new Subject<{ roomId: string; roomCode: string }>();
  private playerJoin$ = new Subject<{ roomId: string; player: Player }>();
  private playerLeave$ = new Subject<{ roomId: string; playerId: string }>();
  private playerReady$ = new Subject<{ roomId: string; playerId: string; isReady: boolean; competitiveStats?: any }>();
  private playerStatisticsUpdate$ = new Subject<{ roomId: string; statistics: PlayerStatistics[] }>();
  private roomDisbanded$ = new Subject<{ roomId: string; reason: string }>();
  private startDrill$ = new Subject<{ roomId: string; drillText: string[] }>();
  private beginDrill$ = new Subject<{ roomId: string; drillText: string[] }>();
  private endDrill$ = new Subject<{ roomId: string; results: CompetitiveDrillResults }>();
  private waitingForOtherPlayers$ = new Subject<{ finishedCount: number; totalCount: number }>();
  private allPlayersCompleted$ = new Subject<{ roomId: string }>();
  private playerAFK$ = new Subject<{ roomId: string; playerId: string }>();
  private afkWarning$ = new Subject<{ roomId: string; playerId: string; timeoutSeconds: number }>();
  private playerKicked$ = new Subject<{ roomCode: string; reason: string }>();
  private countdown$ = new Subject<{ roomId: string; countdown: number }>();
  private roomCreated$ = new Subject<{ roomId: string; roomCode: string }>();
  
  // continue after drill events
  private waitingForPlayersToContinue$ = new Subject<{ roomCode: string; continuedCount: number; totalCount: number }>();
  private allPlayersContinued$ = new Subject<{ roomCode: string }>();

  constructor(private authService: AuthService) {}

  // connection management
  async connect(): Promise<void> {
    // console.log('=== CLIENT CONNECT DEBUG START ===');
    // console.log(`Current hub connection state: ${this.hubConnection?.state}`);
    
    if (this.hubConnection?.state === 'Connected') {
      // console.log('Already connected, returning early');
      return;
    }

    this._connectionState$.next(ConnectionState.Connecting);
    // console.log('Connection state set to Connecting');

    // Check and refresh token if needed before connecting
    await this.ensureValidToken();

    // get authentication token using centralized method
    const token = this.authService.getAccessToken();
    // console.log(`Token found: ${token ? 'Yes' : 'No'}`);
    // console.log(`Token value: ${token ? token.substring(0, 20) + '...' : 'None'}`);
    
    const hubUrl = token 
      ? `${environment.hubUrl}?access_token=${encodeURIComponent(token)}`
      : environment.hubUrl;
    
    // console.log(`Hub URL: ${hubUrl}`);
    // console.log(`Environment hub URL: ${environment.hubUrl}`);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, { 
        withCredentials: true,
        skipNegotiation: false,
        transport: 1 // WebSockets only
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          // Exponential backoff with max delay
          const maxDelay = 30000; // 30 seconds
          const delay = Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), maxDelay);
          console.log(`SignalR reconnection attempt ${retryContext.previousRetryCount + 1}, delay: ${delay}ms`);
          return delay;
        }
      })
      .configureLogging(LogLevel.Information)
      .build();
    
    // console.log('Hub connection built successfully');

    // set up event handlers
    this.setupEventHandlers();
    // console.log('Event handlers set up');

    try {
      // console.log('Attempting to start hub connection...');
      await this.hubConnection.start();
      // console.log('Hub connection started successfully');
      // console.log(`Connection ID: ${this.hubConnection.connectionId}`);
      this._connectionState$.next(ConnectionState.Connected);
      // console.log('Connection state set to Connected');
      
      // Start heartbeat monitoring
      this.startHeartbeat();
      
      // console.log('=== CLIENT CONNECT DEBUG END ===');
    } catch (error) {
      console.error('ERROR starting hub connection:', error);
      this._connectionState$.next(ConnectionState.Disconnected);
      // console.log('=== CLIENT CONNECT DEBUG END (ERROR) ===');
      throw error;
    }
  }

  private async ensureValidToken(): Promise<void> {
    try {
      // Check if token is expiring soon (within 5 minutes)
      if (this.authService.isTokenExpiringSoon(5)) {
        console.log('Token expiring soon, attempting to refresh...');
        await this.authService.refreshTokenIfNeeded().toPromise();
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // Don't throw here, let the connection attempt proceed
    }
  }

  async disconnect(): Promise<void> {
    try {
      // Stop heartbeat monitoring
      this.stopHeartbeat();
      
      if (this.hubConnection) {
        // console.log('CLIENT: Disconnecting from SignalR hub...');
        await this.hubConnection.stop();
        this._connectionState$.next(ConnectionState.Disconnected);
        // console.log('CLIENT: Successfully disconnected from SignalR hub');
      }
    } catch (error) {
      console.error('CLIENT: Error during disconnect:', error);
      // Even if disconnect fails, mark as disconnected to prevent hanging
      this._connectionState$.next(ConnectionState.Disconnected);
    }
  }

  // room management
  async testConnection(): Promise<string> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    return await this.hubConnection.invoke<string>('TestConnection');
  }

  async createRoom(settings: CreateRoomRequest): Promise<{ roomId: string; roomCode: string }> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    const result = await this.hubConnection.invoke<{ success: boolean; roomId?: string; roomCode?: string; error?: string }>('CreateRoom', settings);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create room');
    }
    
    return { roomId: result.roomId!, roomCode: result.roomCode! };
  }

  async getRoomInfo(roomCode: string): Promise<{
    success: boolean;
    roomId?: string;
    roomCode?: string;
    state?: string;
    createdBy?: string;
    settings?: { type: string; difficulty: string; duration: number; length: number };
    error?: string;
  }> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    await this.ensureValidToken();
    return await this.hubConnection.invoke('GetRoomInfo', roomCode);
  }

  async joinRoom(roomCode: string): Promise<void> {
    // console.log('=== CLIENT JOIN ROOM DEBUG START ===');
    // console.log(`Attempting to join room with code: '${roomCode}'`);
    // console.log(`Hub connection state: ${this.hubConnection?.state}`);
    // console.log(`Connection ID: ${this.hubConnection?.connectionId}`);
    
    if (!this.hubConnection) {
      console.error('ERROR: Not connected to SignalR hub');
      throw new Error('Not connected to SignalR hub');
    }
    
    try {
      await this.ensureValidToken();
      // console.log(`Invoking JoinRoom method on server with roomCode: '${roomCode}'`);
      const result = await this.hubConnection.invoke<{ success: boolean; error?: string; roomId?: string; roomCode?: string }>('JoinRoom', roomCode);
      // console.log(`Server response received:`, result);
      
      if (!result.success) {
        console.error(`ERROR: Failed to join room. Server error: ${result.error}`);
        throw new Error(result.error || 'Failed to join room');
      }
      
      // console.log(`SUCCESS: Joined room successfully. RoomId: ${result.roomId}, RoomCode: ${result.roomCode}`);
      // console.log('=== CLIENT JOIN ROOM DEBUG END ===');
    } catch (error) {
      console.error(`ERROR in joinRoom: ${error}`);
      console.error(`Error details:`, error);
      // console.log('=== CLIENT JOIN ROOM DEBUG END (ERROR) ===');
      throw error;
    }
  }

  async leaveRoom(roomCode: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('LeaveRoom', roomCode);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to leave room');
    }
  }

  async setPlayerReady(roomCode: string, isReady: boolean): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('SetPlayerReady', roomCode, isReady);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to set ready status');
    }
  }

  async updatePlayerStatistics(roomCode: string, statistics: PlayerStatistics): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    await this.hubConnection.invoke('UpdatePlayerStatistics', roomCode, statistics);
  }

  async reportPlayerAFK(roomCode: string, isAFK: boolean): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    await this.hubConnection.invoke('ReportPlayerAFK', roomCode, isAFK);
  }

  async startDrill(roomCode: string): Promise<{ success: boolean; error?: string }> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('StartDrill', roomCode);
    return result;
  }

  async completeDrill(roomCode: string, result: any): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    await this.hubConnection.invoke('CompleteDrill', roomCode, result);
  }

  async kickPlayer(roomCode: string, playerId: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    await this.hubConnection.invoke('KickPlayer', roomCode, playerId);
  }

  async continueAfterDrill(roomCode: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.ensureValidToken();
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('ContinueAfterDrill', roomCode);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to continue after drill');
    }
  }

  private setupEventHandlers(): void {
    if (!this.hubConnection) return;

    // connection state changes
    this.hubConnection.onreconnecting(() => {
      console.log('CLIENT: SignalR connection reconnecting...');
      this._connectionState$.next(ConnectionState.Reconnecting);
    });

    this.hubConnection.onreconnected((connectionId) => {
      console.log(`CLIENT: SignalR connection reconnected with ID: ${connectionId}`);
      this._connectionState$.next(ConnectionState.Connected);
      
      // Restart heartbeat after reconnection
      this.startHeartbeat();
    });

    this.hubConnection.onclose((error) => {
      console.log('CLIENT: SignalR connection closed', error);
      this._connectionState$.next(ConnectionState.Disconnected);
      
      // If there was an error, log it for debugging
      if (error) {
        console.error('SignalR connection closed with error:', error);
      }
    });

    // competitive drill events
    this.hubConnection.on('PlayerJoin', (roomId: string, userId: string, username: string, level: number, competitiveRank: string, isCreator: boolean = false, isReady: boolean = false) => {
      const player: Player = {
        userId,
        username,
        level,
        competitiveRank,
        state: isReady ? 'Ready' as const : 'Connected',
        isCreator: isCreator,
        isReady: isReady
      };
      this.playerJoin$.next({ roomId, player });
    });

    this.hubConnection.on('PlayerLeave', (roomId: string, userId: string) => {
      // console.log(`CLIENT: PlayerLeave event received - roomId: ${roomId}, userId: ${userId}`);
      this.playerLeave$.next({ roomId, playerId: userId });
    });

    this.hubConnection.on('PlayerReady', (roomId: string, userId: string, isReady: boolean, competitiveStats?: any) => {
      this.playerReady$.next({ roomId, playerId: userId, isReady, competitiveStats });
    });

    this.hubConnection.on('PlayerStatisticsUpdate', (roomId: string, statistics: PlayerStatistics[]) => {
      // console.log(`CLIENT: PlayerStatisticsUpdate event received - roomId: ${roomId}, statistics count: ${statistics.length}`);
      this.playerStatisticsUpdate$.next({ roomId, statistics });
    });

    this.hubConnection.on('StartDrill', (roomId: string, drillText: string[]) => {
      // console.log(`CLIENT: StartDrill event received - roomId: ${roomId}, drillText length: ${drillText.length}`);
      this.startDrill$.next({ roomId, drillText });
    });

    this.hubConnection.on('BeginDrill', (roomId: string, drillText: string[]) => {
      // console.log(`CLIENT: BeginDrill event received - roomId: ${roomId}, drillText length: ${drillText.length}`);
      this.beginDrill$.next({ roomId, drillText });
    });

    this.hubConnection.on('RoomDisbanded', (roomId: string, reason: string) => {
      // console.log(`CLIENT: RoomDisbanded event received - roomId: ${roomId}, reason: ${reason}`);
      this.roomDisbanded$.next({ roomId, reason });
    });

    this.hubConnection.on('EndDrill', (roomId: string, results: CompetitiveDrillResults) => {
      // console.log(`CLIENT: EndDrill event received - roomId: ${roomId}`);
      this.endDrill$.next({ roomId, results });
    });

    this.hubConnection.on('WaitingForOtherPlayers', (finishedCount: number, totalCount: number) => {
      // console.log(`CLIENT: WaitingForOtherPlayers event received - finished: ${finishedCount}, total: ${totalCount}`);
      this.waitingForOtherPlayers$.next({ finishedCount, totalCount });
    });

    this.hubConnection.on('AllPlayersCompleted', (roomId: string) => {
      // console.log(`CLIENT: AllPlayersCompleted event received - roomId: ${roomId}`);
      this.allPlayersCompleted$.next({ roomId });
    });

    this.hubConnection.on('PlayerAFK', (roomId: string, userId: string) => {
      // console.log(`CLIENT: PlayerAFK event received - roomId: ${roomId}, userId: ${userId}`);
      this.playerAFK$.next({ roomId, playerId: userId });
    });

    this.hubConnection.on('AFKWarning', (roomId: string, userId: string, timeoutSeconds: number) => {
      // console.log(`CLIENT: AFKWarning event received - roomId: ${roomId}, userId: ${userId}, timeout: ${timeoutSeconds}`);
      this.afkWarning$.next({ roomId, playerId: userId, timeoutSeconds });
    });

    this.hubConnection.on('PlayerKicked', (roomCode: string, reason: string) => {
      // console.log(`CLIENT: PlayerKicked event received - roomCode: ${roomCode}, reason: ${reason}`);
      this.playerKicked$.next({ roomCode, reason });
    });

    this.hubConnection.on('Countdown', (roomId: string, countdown: number) => {
      // console.log(`CLIENT: Countdown event received - roomId: ${roomId}, countdown: ${countdown}`);
      this.countdown$.next({ roomId, countdown });
    });

    this.hubConnection.on('RoomCreated', (roomId: string, roomCode: string) => {
      // console.log(`CLIENT: RoomCreated event received - roomId: ${roomId}, roomCode: ${roomCode}`);
      this.roomCreated$.next({ roomId, roomCode });
    });

    this.hubConnection.on('RoomJoined', (roomId: string, roomCode: string) => {
      // console.log(`CLIENT: RoomJoined event received - roomId: ${roomId}, roomCode: ${roomCode}`);
      this.roomJoined$.next({ roomId, roomCode });
    });

    // continue after drill events
    this.hubConnection.on('WaitingForPlayersToContinue', (roomCode: string, continuedCount: number, totalCount: number) => {
      // console.log(`CLIENT: WaitingForPlayersToContinue event received - roomCode: ${roomCode}, continued: ${continuedCount}, total: ${totalCount}`);
      this.waitingForPlayersToContinue$.next({ roomCode, continuedCount, totalCount });
    });

    this.hubConnection.on('AllPlayersContinued', (roomCode: string) => {
      // console.log(`CLIENT: AllPlayersContinued event received - roomCode: ${roomCode}`);
      this.allPlayersContinued$.next({ roomCode });
    });
  }

  private startHeartbeat(): void {
    // Clear any existing heartbeat
    this.stopHeartbeat();
    
    // Start heartbeat every 30 seconds
    this.heartbeatInterval = setInterval(async () => {
      try {
        if (this.hubConnection?.state === 'Connected') {
          // Send a test message to verify connection is alive
          await this.hubConnection.invoke('TestConnection');
          this.lastHeartbeatTime = Date.now();
        } else {
          console.warn('Heartbeat detected disconnected state, attempting reconnection...');
          await this.reconnect();
        }
      } catch (error) {
        console.error('Heartbeat failed:', error);
        // If heartbeat fails, try to reconnect
        await this.reconnect();
      }
    }, 30000); // 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  private async reconnect(): Promise<void> {
    try {
      console.log('Attempting to reconnect to SignalR...');
      await this.disconnect();
      await this.connect();
    } catch (error) {
      console.error('Reconnection failed:', error);
    }
  }

  // getters for observables
  get connectionState$(): Observable<ConnectionState> {
    return this._connectionState$.asObservable();
  }

  get onPlayerJoin$(): Observable<{ roomId: string; player: Player }> {
    return this.playerJoin$.asObservable();
  }

  get onPlayerLeave$(): Observable<{ roomId: string; playerId: string }> {
    return this.playerLeave$.asObservable();
  }

  get onPlayerReady$(): Observable<{ roomId: string; playerId: string; isReady: boolean; competitiveStats?: any }> {
    return this.playerReady$.asObservable();
  }

  get onPlayerStatisticsUpdate$(): Observable<{ roomId: string; statistics: PlayerStatistics[] }> {
    return this.playerStatisticsUpdate$.asObservable();
  }

  get onStartDrill$(): Observable<{ roomId: string; drillText: string[] }> {
    return this.startDrill$.asObservable();
  }

  get onBeginDrill$(): Observable<{ roomId: string; drillText: string[] }> {
    return this.beginDrill$.asObservable();
  }

  get onRoomDisbanded$(): Observable<{ roomId: string; reason: string }> {
    return this.roomDisbanded$.asObservable();
  }

  get onEndDrill$(): Observable<{ roomId: string; results: CompetitiveDrillResults }> {
    return this.endDrill$.asObservable();
  }

  get onWaitingForOtherPlayers$(): Observable<{ finishedCount: number; totalCount: number }> {
    return this.waitingForOtherPlayers$.asObservable();
  }

  get onAllPlayersCompleted$(): Observable<{ roomId: string }> {
    return this.allPlayersCompleted$.asObservable();
  }

  get onPlayerAFK$(): Observable<{ roomId: string; playerId: string }> {
    return this.playerAFK$.asObservable();
  }

  get onAFKWarning$(): Observable<{ roomId: string; playerId: string; timeoutSeconds: number }> {
    return this.afkWarning$.asObservable();
  }

  get onPlayerKicked$(): Observable<{ roomCode: string; reason: string }> {
    return this.playerKicked$.asObservable();
  }

  get onCountdown$(): Observable<{ roomId: string; countdown: number }> {
    return this.countdown$.asObservable();
  }

  get onRoomCreated$(): Observable<{ roomId: string; roomCode: string }> {
    return this.roomCreated$.asObservable();
  }

  get onRoomJoined$(): Observable<{ roomId: string; roomCode: string }> {
    return this.roomJoined$.asObservable();
  }

  get onWaitingForPlayersToContinue$(): Observable<{ roomCode: string; continuedCount: number; totalCount: number }> {
    return this.waitingForPlayersToContinue$.asObservable();
  }

  get onAllPlayersContinued$(): Observable<{ roomCode: string }> {
    return this.allPlayersContinued$.asObservable();
  }

  isConnected(): boolean {
    return this.hubConnection?.state === 'Connected';
  }

  getConnectionId(): string | undefined {
    return this.hubConnection?.connectionId ?? undefined;
  }

  getConnectionHealth(): {
    state: string;
    connectionId?: string;
    lastHeartbeat: number;
    timeSinceLastHeartbeat: number;
  } {
    const now = Date.now();
    return {
      state: this.hubConnection?.state || 'Unknown',
      connectionId: this.hubConnection?.connectionId || undefined,
      lastHeartbeat: this.lastHeartbeatTime,
      timeSinceLastHeartbeat: this.lastHeartbeatTime > 0 ? now - this.lastHeartbeatTime : 0
    };
  }

  debugConnection(): void {
    const health = this.getConnectionHealth();
    console.log('=== SignalR Connection Debug ===');
    console.log('Connection State:', health.state);
    console.log('Connection ID:', health.connectionId);
    console.log('Last Heartbeat:', new Date(health.lastHeartbeat).toISOString());
    console.log('Time Since Last Heartbeat:', health.timeSinceLastHeartbeat, 'ms');
    console.log('Token Expiring Soon:', this.authService.isTokenExpiringSoon(5));
    console.log('Token Expired:', this.authService.isTokenExpired());
    console.log('===============================');
  }
} 