import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

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
  state: 'Connected' | 'Ready' | 'Typing' | 'Finished' | 'Disconnected';
  statistics?: PlayerStatistics;
  isCreator?: boolean;
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
  }[];
  startedAt: Date;
  endedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection?: HubConnection;
  private _connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.Disconnected);
  
  // event subjects for competitive drill events
  private roomJoined$ = new Subject<{ roomId: string; roomCode: string }>();
  private playerJoin$ = new Subject<{ roomId: string; player: Player }>();
  private playerLeave$ = new Subject<{ roomId: string; playerId: string }>();
  private playerReady$ = new Subject<{ roomId: string; playerId: string }>();
  private playerStatisticsUpdate$ = new Subject<{ roomId: string; statistics: PlayerStatistics[] }>();
  private roomDisbanded$ = new Subject<{ roomId: string; reason: string }>();
  private startDrill$ = new Subject<{ roomId: string; drillText: string[] }>();
  private beginDrill$ = new Subject<{ roomId: string; drillText: string[] }>();
  private endDrill$ = new Subject<{ roomId: string; results: CompetitiveDrillResults }>();
  private waitingForOtherPlayers$ = new Subject<{ finishedCount: number; totalCount: number }>();
  private allPlayersCompleted$ = new Subject<{ roomId: string }>();
  private playerAFK$ = new Subject<{ roomId: string; playerId: string }>();
  private afkWarning$ = new Subject<{ roomId: string; playerId: string; timeoutSeconds: number }>();
  private countdown$ = new Subject<{ roomId: string; countdown: number }>();
  private roomCreated$ = new Subject<{ roomId: string; roomCode: string }>();

  constructor() {}

  // connection management
  async connect(): Promise<void> {
    console.log('=== CLIENT CONNECT DEBUG START ===');
    console.log(`Current hub connection state: ${this.hubConnection?.state}`);
    
    if (this.hubConnection?.state === 'Connected') {
      console.log('Already connected, returning early');
      return;
    }

    this._connectionState$.next(ConnectionState.Connecting);
    console.log('Connection state set to Connecting');

    // get authentication token
    const token = localStorage.getItem('accessToken');
    console.log(`Token found: ${token ? 'Yes' : 'No'}`);
    console.log(`Token value: ${token ? token.substring(0, 20) + '...' : 'None'}`);
    
    const hubUrl = token 
      ? `${environment.hubUrl}?access_token=${encodeURIComponent(token)}`
      : environment.hubUrl;
    
    console.log(`Hub URL: ${hubUrl}`);
    console.log(`Environment hub URL: ${environment.hubUrl}`);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, { 
        withCredentials: true
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    
    console.log('Hub connection built successfully');

    // set up event handlers
    this.setupEventHandlers();
    console.log('Event handlers set up');

    try {
      console.log('Attempting to start hub connection...');
      await this.hubConnection.start();
      console.log('Hub connection started successfully');
      console.log(`Connection ID: ${this.hubConnection.connectionId}`);
      this._connectionState$.next(ConnectionState.Connected);
      console.log('Connection state set to Connected');
      console.log('=== CLIENT CONNECT DEBUG END ===');
    } catch (error) {
      console.error('ERROR starting hub connection:', error);
      this._connectionState$.next(ConnectionState.Disconnected);
      console.log('=== CLIENT CONNECT DEBUG END (ERROR) ===');
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this._connectionState$.next(ConnectionState.Disconnected);
    }
  }

  // room management
  async testConnection(): Promise<string> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    return await this.hubConnection.invoke<string>('TestConnection');
  }

  async createRoom(settings: CreateRoomRequest): Promise<{ roomId: string; roomCode: string }> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    const result = await this.hubConnection.invoke<{ success: boolean; roomId?: string; roomCode?: string; error?: string }>('CreateRoom', settings);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create room');
    }
    
    return { roomId: result.roomId!, roomCode: result.roomCode! };
  }

  async joinRoom(roomCode: string): Promise<void> {
    console.log('=== CLIENT JOIN ROOM DEBUG START ===');
    console.log(`Attempting to join room with code: '${roomCode}'`);
    console.log(`Hub connection state: ${this.hubConnection?.state}`);
    console.log(`Connection ID: ${this.hubConnection?.connectionId}`);
    
    if (!this.hubConnection) {
      console.error('ERROR: Not connected to SignalR hub');
      throw new Error('Not connected to SignalR hub');
    }
    
    try {
      console.log(`Invoking JoinRoom method on server with roomCode: '${roomCode}'`);
      const result = await this.hubConnection.invoke<{ success: boolean; error?: string; roomId?: string; roomCode?: string }>('JoinRoom', roomCode);
      console.log(`Server response received:`, result);
      
      if (!result.success) {
        console.error(`ERROR: Failed to join room. Server error: ${result.error}`);
        throw new Error(result.error || 'Failed to join room');
      }
      
      console.log(`SUCCESS: Joined room successfully. RoomId: ${result.roomId}, RoomCode: ${result.roomCode}`);
      console.log('=== CLIENT JOIN ROOM DEBUG END ===');
    } catch (error) {
      console.error(`ERROR in joinRoom: ${error}`);
      console.error(`Error details:`, error);
      console.log('=== CLIENT JOIN ROOM DEBUG END (ERROR) ===');
      throw error;
    }
  }

  async leaveRoom(roomCode: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('LeaveRoom', roomCode);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to leave room');
    }
  }

  async setPlayerReady(roomCode: string, isReady: boolean): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    const result = await this.hubConnection.invoke<{ success: boolean; error?: string }>('SetPlayerReady', roomCode, isReady);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to set ready status');
    }
  }

  async updatePlayerStatistics(roomCode: string, statistics: PlayerStatistics): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.hubConnection.invoke('UpdatePlayerStatistics', roomCode, statistics);
  }

  async startDrill(roomCode: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.hubConnection.invoke('StartDrill', roomCode);
  }

  async completeDrill(roomCode: string, result: any): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.hubConnection.invoke('CompleteDrill', roomCode, result);
  }

  async kickPlayer(roomCode: string, playerId: string): Promise<void> {
    if (!this.hubConnection) {
      throw new Error('Not connected to SignalR hub');
    }
    
    await this.hubConnection.invoke('KickPlayer', roomCode, playerId);
  }

  private setupEventHandlers(): void {
    if (!this.hubConnection) return;

    // connection state changes
    this.hubConnection.onreconnecting(() => {
      console.log('CLIENT: SignalR connection reconnecting...');
      this._connectionState$.next(ConnectionState.Reconnecting);
    });

    this.hubConnection.onreconnected(() => {
      console.log('CLIENT: SignalR connection reconnected');
      this._connectionState$.next(ConnectionState.Connected);
    });

    this.hubConnection.onclose(() => {
      console.log('CLIENT: SignalR connection closed');
      this._connectionState$.next(ConnectionState.Disconnected);
    });

    // competitive drill events
    this.hubConnection.on('PlayerJoin', (roomId: string, userId: string, username: string, level: number, isCreator: boolean = false) => {
      console.log(`CLIENT: PlayerJoin event received - roomId: ${roomId}, userId: ${userId}, username: ${username}, level: ${level}, isCreator: ${isCreator}`);
      const player: Player = {
        userId,
        username,
        level,
        state: 'Connected',
        isCreator: isCreator
      };
      this.playerJoin$.next({ roomId, player });
    });

    this.hubConnection.on('PlayerLeave', (roomId: string, userId: string) => {
      console.log(`CLIENT: PlayerLeave event received - roomId: ${roomId}, userId: ${userId}`);
      this.playerLeave$.next({ roomId, playerId: userId });
    });

    this.hubConnection.on('PlayerReady', (roomId: string, userId: string) => {
      console.log(`CLIENT: PlayerReady event received - roomId: ${roomId}, userId: ${userId}`);
      this.playerReady$.next({ roomId, playerId: userId });
    });

    this.hubConnection.on('PlayerStatisticsUpdate', (roomId: string, statistics: PlayerStatistics[]) => {
      console.log(`CLIENT: PlayerStatisticsUpdate event received - roomId: ${roomId}, statistics count: ${statistics.length}`);
      this.playerStatisticsUpdate$.next({ roomId, statistics });
    });

    this.hubConnection.on('StartDrill', (roomId: string, drillText: string[]) => {
      console.log(`CLIENT: StartDrill event received - roomId: ${roomId}, drillText length: ${drillText.length}`);
      this.startDrill$.next({ roomId, drillText });
    });

    this.hubConnection.on('BeginDrill', (roomId: string, drillText: string[]) => {
      console.log(`CLIENT: BeginDrill event received - roomId: ${roomId}, drillText length: ${drillText.length}`);
      this.beginDrill$.next({ roomId, drillText });
    });

    this.hubConnection.on('RoomDisbanded', (roomId: string, reason: string) => {
      console.log(`CLIENT: RoomDisbanded event received - roomId: ${roomId}, reason: ${reason}`);
      this.roomDisbanded$.next({ roomId, reason });
    });

    this.hubConnection.on('EndDrill', (roomId: string, results: CompetitiveDrillResults) => {
      console.log(`CLIENT: EndDrill event received - roomId: ${roomId}`);
      this.endDrill$.next({ roomId, results });
    });

    this.hubConnection.on('WaitingForOtherPlayers', (finishedCount: number, totalCount: number) => {
      console.log(`CLIENT: WaitingForOtherPlayers event received - finished: ${finishedCount}, total: ${totalCount}`);
      this.waitingForOtherPlayers$.next({ finishedCount, totalCount });
    });

    this.hubConnection.on('AllPlayersCompleted', (roomId: string) => {
      console.log(`CLIENT: AllPlayersCompleted event received - roomId: ${roomId}`);
      this.allPlayersCompleted$.next({ roomId });
    });

    this.hubConnection.on('PlayerAFK', (roomId: string, userId: string) => {
      console.log(`CLIENT: PlayerAFK event received - roomId: ${roomId}, userId: ${userId}`);
      this.playerAFK$.next({ roomId, playerId: userId });
    });

    this.hubConnection.on('AFKWarning', (roomId: string, userId: string, timeoutSeconds: number) => {
      console.log(`CLIENT: AFKWarning event received - roomId: ${roomId}, userId: ${userId}, timeout: ${timeoutSeconds}`);
      this.afkWarning$.next({ roomId, playerId: userId, timeoutSeconds });
    });

    this.hubConnection.on('Countdown', (roomId: string, countdown: number) => {
      console.log(`CLIENT: Countdown event received - roomId: ${roomId}, countdown: ${countdown}`);
      this.countdown$.next({ roomId, countdown });
    });

    this.hubConnection.on('RoomCreated', (roomId: string, roomCode: string) => {
      console.log(`CLIENT: RoomCreated event received - roomId: ${roomId}, roomCode: ${roomCode}`);
      this.roomCreated$.next({ roomId, roomCode });
    });

    this.hubConnection.on('RoomJoined', (roomId: string, roomCode: string) => {
      console.log(`CLIENT: RoomJoined event received - roomId: ${roomId}, roomCode: ${roomCode}`);
      this.roomJoined$.next({ roomId, roomCode });
    });
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

  get onPlayerReady$(): Observable<{ roomId: string; playerId: string }> {
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

  get onCountdown$(): Observable<{ roomId: string; countdown: number }> {
    return this.countdown$.asObservable();
  }

  get onRoomCreated$(): Observable<{ roomId: string; roomCode: string }> {
    return this.roomCreated$.asObservable();
  }

  get onRoomJoined$(): Observable<{ roomId: string; roomCode: string }> {
    return this.roomJoined$.asObservable();
  }

  isConnected(): boolean {
    return this.hubConnection?.state === 'Connected';
  }

  getConnectionId(): string | undefined {
    return this.hubConnection?.connectionId ?? undefined;
  }
} 