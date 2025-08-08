import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Subscription } from 'rxjs';
import { SignalRService, Player } from '../../../../services/signalr.service';
import { RoomSessionService } from '../../../../services/room-session.service';



@Component({
  selector: 'app-lobby-overlay',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, NzPopconfirmModule],
  templateUrl: './lobby-overlay.component.html',
  styleUrl: './lobby-overlay.component.scss',
})
export class LobbyOverlayComponent implements OnInit, OnDestroy, OnChanges {
  Math = Math; // make Math available in template
  @Input() show: boolean = false;
  @Input() roomCode: string = '';
  @Input() userRole: 'Creator' | 'Member' = 'Member';
  @Input() roomState: 'Waiting' | 'Ready' | 'InProgress' | 'Finished' = 'Waiting';
  @Input() drillType: string = 'Timed';
  @Input() difficulty: string = 'Intermediate';
  @Input() duration: string = '60s';
  @Input() isCurrentUserReady: boolean = false;
  @Input() players: any[] = [];
  
  @Output() leaveRoom = new EventEmitter<void>();
  @Output() startDrill = new EventEmitter<void>();
  @Output() setReady = new EventEmitter<void>();
  isWaitingForOthers: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private signalRService: SignalRService,
    private roomSessionService: RoomSessionService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.setupSignalRSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // reset state when overlay is hidden
    if (changes['show'] && !changes['show'].currentValue) {
      this.resetState();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupSignalRSubscriptions(): void {
    // subscribe to drill start events
    this.subscriptions.push(
      this.signalRService.onStartDrill$.subscribe(({ roomId, drillText }) => {
        this.startDrill.emit();
      })
    );


  }

  onCopyRoomCode(): void {
    navigator.clipboard.writeText(this.roomCode).then(() => {
      this.notification.success('Success', 'Room code copied to clipboard!');
    }).catch(() => {
      this.notification.error('Error', 'Failed to copy room code');
    });
  }

  onSetReady(): void {
    this.setReady.emit();
  }

  onStartDrill(): void {
    this.startDrill.emit();
  }

  onLeaveRoom(): void {
    this.resetState();
    this.leaveRoom.emit();
  }

  private resetState(): void {
    this.isWaitingForOthers = false;
  }

  get canStartDrill(): boolean {
    // need at least 2 players and all players must be ready
    return this.players.length >= 2 && this.players.every(player => player.isReady);
  }

  getStartDrillButtonText(): string {
    if (this.players.length < 2) {
      return `Waiting...`;
    }
    
    const readyCount = this.players.filter(player => player.isReady).length;
    const totalCount = this.players.length;
    
    if (readyCount === totalCount) {
      return 'Start Drill';
    } else {
      return `${readyCount}/${totalCount} ready`;
    }
  }




}
