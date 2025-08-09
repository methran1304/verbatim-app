import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Subscription } from 'rxjs';
import { SignalRService, Player } from '../../../../services/signalr.service';
import { JwtDecoderUtil } from '../../../../core/utils/jwt-decoder.util';



@Component({
  selector: 'app-lobby-overlay',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, NzPopconfirmModule, NzSpinModule],
  providers: [],
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
  animatedDots: string = '.';
  
  private subscriptions: Subscription[] = [];
  private dotsInterval: any;

  constructor(
    private signalRService: SignalRService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.setupSignalRSubscriptions();
    this.startDotsAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // reset state when overlay is hidden
    if (changes['show'] && !changes['show'].currentValue) {
      this.resetState();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.dotsInterval) {
      clearInterval(this.dotsInterval);
    }
  }

  private setupSignalRSubscriptions(): void {
    // subscribe to player join/leave events for notifications
    this.subscriptions.push(
      this.signalRService.onPlayerJoin$.subscribe(({ roomId, player }) => {
        // only show notification if it's not the current user joining and not the room creator
        const currentUserId = this.getCurrentUserId();
        if (player.userId !== currentUserId && !player.isCreator) {
          this.notification.create('info', 'Player Joined', `${player.username} joined the room`);
        }
      })
    );

    this.subscriptions.push(
      this.signalRService.onPlayerLeave$.subscribe(({ roomId, playerId }) => {
        // only show notification if it's not the current user leaving
        const currentUserId = this.getCurrentUserId();
        if (playerId !== currentUserId) {
          // find the player's username from the current players list
          const leavingPlayer = this.players.find(p => p.userId === playerId);
          const playerName = leavingPlayer?.username || 'A player';
          this.notification.create('warning', 'Player Left', `${playerName} has left the room`);
        }
      })
    );
  }

  onCopyRoomCode(): void {
    navigator.clipboard.writeText(this.roomCode).then(() => {
      this.notification.create('success', 'Success', 'Room code copied to clipboard!');
    }).catch(() => {
      this.notification.create('error', 'Error', 'Failed to copy room code');
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

  private startDotsAnimation(): void {
    const dotsPattern = ['.', '..', '...'];
    let currentIndex = 0;
    
    this.dotsInterval = setInterval(() => {
      this.animatedDots = dotsPattern[currentIndex];
      currentIndex = (currentIndex + 1) % dotsPattern.length;
    }, 1000); // change every 500ms
  }

  private getCurrentUserId(): string {
    const token = localStorage.getItem('accessToken') || '';
    return JwtDecoderUtil.getUserId(token) || '';
  }
}
