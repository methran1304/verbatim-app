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
  private playerJoin$ = new Subject<{ roomId: string; player: Player }>();
  private playerLeave$ = new Subject<{ roomId: string; playerId: string }>();
  private playerReady$ = new Subject<{ roomId: string; playerId: string }>();
  private playerStatisticsUpdate$ = new Subject<{ roomId: string; statistics: PlayerStatistics[] }>();
  private startDrill$ = new Subject<{ roomId: string; drillText: string[] }>();
  private endDrill$ = new Subject<{ roomId: string; results: CompetitiveDrillResults }>();
  private waitingForOtherPlayers$ = new Subject<{ finishedCount: number; totalCount: number }>();
  private allPlayersCompleted$ = new Subject<{ roomId: string }>();
  private playerAFK$ = new Subject<{ roomId: string; playerId: string }>();
  private afkWarning$ = new Subject<{ roomId: string; playerId: string; timeoutSeconds: number }>();
  private countdown$ = new Subject<{ roomId: string; countdown: number }>();

  constructor() {}

  // connection management
  async connect(): Promise<void> {
    if (this.hubConnection?.state === 'Connected') {
      return;
    }

    this._connectionState$.next(ConnectionState.Connecting);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiBaseUrl}/competitive-hub`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    // set up event handlers
    this.setupEventHandlers();

    try {
      await this.hubConnection.start();
      this._connectionState$.next(ConnectionState.Connected);
      console.log('SignalR Connected');
    } catch (error) {
      this._connectionState$.next(ConnectionState.Disconnected);
      console.error('SignalR Connection Error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this._connectionState$.next(ConnectionState.Disconnected);
    }
  }

  // hub method calls (client to server)
  async joinRoom(roomCode: string): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('JoinRoom', roomCode);
  }

  async leaveRoom(roomCode: string): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('LeaveRoom', roomCode);
  }

  async setPlayerReady(roomCode: string, isReady: boolean): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('SetPlayerReady', roomCode, isReady);
  }

  async updatePlayerStatistics(roomCode: string, statistics: PlayerStatistics): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('UpdatePlayerStatistics', roomCode, statistics);
  }

  async startDrill(roomCode: string): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('StartDrill', roomCode);
  }

  async completeDrill(roomCode: string, result: any): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('CompleteDrill', roomCode, result);
  }

  async kickPlayer(roomCode: string, playerId: string): Promise<void> {
    if (!this.hubConnection) throw new Error('Not connected');
    await this.hubConnection.invoke('KickPlayer', roomCode, playerId);
  }

  // event listeners (server to client)
  private setupEventHandlers(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('PlayerJoin', (roomId: string, player: Player) => {
      this.playerJoin$.next({ roomId, player });
    });

    this.hubConnection.on('PlayerLeave', (roomId: string, playerId: string) => {
      this.playerLeave$.next({ roomId, playerId });
    });

    this.hubConnection.on('PlayerReady', (roomId: string, playerId: string) => {
      this.playerReady$.next({ roomId, playerId });
    });

    this.hubConnection.on('PlayerStatisticsUpdate', (roomId: string, statistics: PlayerStatistics[]) => {
      this.playerStatisticsUpdate$.next({ roomId, statistics });
    });

    this.hubConnection.on('StartDrill', (roomId: string, drillText: string[]) => {
      this.startDrill$.next({ roomId, drillText });
    });

    this.hubConnection.on('EndDrill', (roomId: string, results: CompetitiveDrillResults) => {
      this.endDrill$.next({ roomId, results });
    });

    this.hubConnection.on('WaitingForOtherPlayers', (finishedCount: number, totalCount: number) => {
      this.waitingForOtherPlayers$.next({ finishedCount, totalCount });
    });

    this.hubConnection.on('AllPlayersCompleted', (roomId: string) => {
      this.allPlayersCompleted$.next({ roomId });
    });

    this.hubConnection.on('PlayerAFK', (roomId: string, playerId: string) => {
      this.playerAFK$.next({ roomId, playerId });
    });

    this.hubConnection.on('AFKWarning', (roomId: string, playerId: string, timeoutSeconds: number) => {
      this.afkWarning$.next({ roomId, playerId, timeoutSeconds });
    });

    this.hubConnection.on('Countdown', (roomId: string, countdown: number) => {
      this.countdown$.next({ roomId, countdown });
    });

    // connection state changes
    this.hubConnection.onreconnecting(() => {
      this._connectionState$.next(ConnectionState.Reconnecting);
    });

    this.hubConnection.onreconnected(() => {
      this._connectionState$.next(ConnectionState.Connected);
    });

    this.hubConnection.onclose(() => {
      this._connectionState$.next(ConnectionState.Disconnected);
    });
  }

  // observable getters for events
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

  // utility methods
  isConnected(): boolean {
    return this.hubConnection?.state === 'Connected';
  }

  getConnectionId(): string | undefined {
    return this.hubConnection?.connectionId ?? undefined;
  }
} 