import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';
import { SignalRService, ConnectionState } from '../../services/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signalr-test',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzInputModule,
    NzFormModule,
    NzDividerModule,
    FormsModule
  ],
  template: `
    <div class="signalr-test-container">
      <nz-card title="SignalR Connection Test">
        <div class="connection-status">
          <h3>Connection Status</h3>
          <nz-tag [nzColor]="getConnectionColor()">{{ connectionState }}</nz-tag>
          
          <div class="connection-actions">
            <button nz-button nzType="primary" (click)="connect()" [disabled]="isConnected()">
              Connect
            </button>
            <button nz-button nzType="default" (click)="disconnect()" [disabled]="!isConnected()">
              Disconnect
            </button>
          </div>
        </div>

        <nz-divider></nz-divider>

        <div class="room-testing">
          <h3>Room Testing</h3>
          <div class="room-input">
            <input nz-input placeholder="Enter Room Code" [(ngModel)]="roomCode" />
            <button nz-button nzType="primary" (click)="joinRoom()" [disabled]="!isConnected() || !roomCode">
              Join Room
            </button>
            <button nz-button nzType="default" (click)="leaveRoom()" [disabled]="!isConnected() || !roomCode">
              Leave Room
            </button>
          </div>
        </div>

        <nz-divider></nz-divider>

        <div class="event-log">
          <h3>Event Log</h3>
          <div class="log-actions">
            <button nz-button nzSize="small" (click)="clearLog()">Clear Log</button>
          </div>
          <div class="log-content">
            @for (event of eventLog; track $index) {
              <div class="log-entry" [class]="event.type">
                <span class="timestamp">{{ event.timestamp | date:'HH:mm:ss' }}</span>
                <span class="message">{{ event.message }}</span>
              </div>
            }
          </div>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    .signalr-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .connection-status {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    .connection-actions {
      display: flex;
      gap: 10px;
    }

    .room-testing {
      margin-bottom: 20px;
    }

    .room-input {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .room-input input {
      width: 200px;
    }

    .event-log {
      margin-top: 20px;
    }

    .log-actions {
      margin-bottom: 10px;
    }

    .log-content {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding: 10px;
      background-color: #fafafa;
    }

    .log-entry {
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
      font-family: monospace;
      font-size: 12px;
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .log-entry.info {
      color: #1890ff;
    }

    .log-entry.success {
      color: #52c41a;
    }

    .log-entry.warning {
      color: #faad14;
    }

    .log-entry.error {
      color: #ff4d4f;
    }

    .timestamp {
      color: #666;
      margin-right: 10px;
    }

    .message {
      font-weight: 500;
    }
  `]
})
export class SignalRTestComponent implements OnInit, OnDestroy {
  connectionState: ConnectionState = ConnectionState.Disconnected;
  roomCode: string = '';
  eventLog: Array<{ timestamp: Date; message: string; type: string }> = [];
  
  private subscriptions: Subscription[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    // subscribe to connection state changes
    this.subscriptions.push(
      this.signalRService.connectionState$.subscribe(state => {
        this.connectionState = state;
        this.addLog(`Connection state changed to: ${state}`, 'info');
      })
    );

    // subscribe to signalr events
    this.subscriptions.push(
      this.signalRService.onPlayerJoin$.subscribe(data => {
        this.addLog(`Player joined: ${data.player.username} (${data.player.userId})`, 'success');
      })
    );

    this.subscriptions.push(
      this.signalRService.onPlayerLeave$.subscribe(data => {
        this.addLog(`Player left: ${data.playerId}`, 'warning');
      })
    );

    this.subscriptions.push(
      this.signalRService.onPlayerReady$.subscribe(data => {
        this.addLog(`Player ready: ${data.playerId}`, 'success');
      })
    );

    this.subscriptions.push(
      this.signalRService.onStartDrill$.subscribe(data => {
        this.addLog(`Drill started with ${data.drillText.length} words`, 'success');
      })
    );

    this.subscriptions.push(
      this.signalRService.onCountdown$.subscribe(data => {
        this.addLog(`Countdown: ${data.countdown}`, 'info');
      })
    );

    this.subscriptions.push(
      this.signalRService.onEndDrill$.subscribe(data => {
        this.addLog(`Drill ended. Winner: ${data.results.winnerUsername}`, 'success');
      })
    );

    this.subscriptions.push(
      this.signalRService.onPlayerAFK$.subscribe(data => {
        this.addLog(`Player AFK: ${data.playerId}`, 'warning');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async connect(): Promise<void> {
    try {
      this.addLog('Attempting to connect...', 'info');
      await this.signalRService.connect();
      this.addLog('Successfully connected to SignalR hub', 'success');
    } catch (error) {
      this.addLog(`Connection failed: ${error}`, 'error');
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.signalRService.disconnect();
      this.addLog('Disconnected from SignalR hub', 'info');
    } catch (error) {
      this.addLog(`Disconnect error: ${error}`, 'error');
    }
  }

  async joinRoom(): Promise<void> {
    if (!this.roomCode.trim()) {
      this.addLog('Please enter a room code', 'warning');
      return;
    }

    try {
      this.addLog(`Attempting to join room: ${this.roomCode}`, 'info');
      await this.signalRService.joinRoom(this.roomCode);
      this.addLog(`Successfully joined room: ${this.roomCode}`, 'success');
    } catch (error) {
      this.addLog(`Failed to join room: ${error}`, 'error');
    }
  }

  async leaveRoom(): Promise<void> {
    if (!this.roomCode.trim()) {
      this.addLog('Please enter a room code', 'warning');
      return;
    }

    try {
      this.addLog(`Attempting to leave room: ${this.roomCode}`, 'info');
      await this.signalRService.leaveRoom(this.roomCode);
      this.addLog(`Successfully left room: ${this.roomCode}`, 'success');
    } catch (error) {
      this.addLog(`Failed to leave room: ${error}`, 'error');
    }
  }

  clearLog(): void {
    this.eventLog = [];
  }

  isConnected(): boolean {
    return this.signalRService.isConnected();
  }

  getConnectionColor(): string {
    switch (this.connectionState) {
      case ConnectionState.Connected:
        return 'success';
      case ConnectionState.Connecting:
      case ConnectionState.Reconnecting:
        return 'processing';
      case ConnectionState.Disconnected:
      default:
        return 'default';
    }
  }

  private addLog(message: string, type: string = 'info'): void {
    this.eventLog.push({
      timestamp: new Date(),
      message,
      type
    });
  }
} 