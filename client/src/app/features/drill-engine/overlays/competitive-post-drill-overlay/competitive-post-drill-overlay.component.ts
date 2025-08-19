import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Subscription } from 'rxjs';
import { SignalRService } from '../../../../services/signalr.service';
import { ConfettiService } from '../../../../shared/confetti.service';

@Component({
  selector: 'app-competitive-post-drill-overlay',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzPopconfirmModule,
    NzDividerModule
  ],
  templateUrl: './competitive-post-drill-overlay.component.html',
  styleUrl: './competitive-post-drill-overlay.component.scss'
})
export class CompetitivePostDrillOverlayComponent implements OnInit, OnDestroy, OnChanges {
  @Input() show: boolean = false;
  @Input() winnerUsername: string = '';
  @Input() userWpm: number = 0;
  @Input() userAccuracy: number = 0;
  @Input() userPointsChange: number = 0;
  @Input() isSubmitting: boolean = false;
  @Input() submitError: string = '';
  @Input() roomCode: string = '';
  @Input() showConfetti: boolean = false;

  @Output() continue = new EventEmitter<void>();
  @Output() leaveRoom = new EventEmitter<void>();
  @Output() allPlayersContinued = new EventEmitter<void>(); // New event for when all players continue

  // Waiting state properties
  public isWaitingForContinue: boolean = false;
  public continueProgress: { continued: number; total: number } = { continued: 0, total: 0 };
  public hasCurrentUserContinued: boolean = false;
  
  private subscriptions: Subscription[] = [];

  constructor(private signalRService: SignalRService, private confettiService: ConfettiService) {}

  ngOnInit(): void {
    this.setupSignalRSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showConfetti'] && changes['showConfetti'].currentValue === true) {
      setTimeout(() => {
        this.confettiService.triggerConfetti();
      }, 500);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupSignalRSubscriptions(): void {
    // subscribe to waiting for players to continue
    const waitingForContinueSubscription = this.signalRService.onWaitingForPlayersToContinue$.subscribe(({ roomCode, continuedCount, totalCount }) => {
      if (roomCode === this.roomCode) {
        this.continueProgress = { continued: continuedCount, total: totalCount };
        // only show waiting state if current user has already continued
        this.isWaitingForContinue = this.hasCurrentUserContinued;
      }
    });
    this.subscriptions.push(waitingForContinueSubscription);

    // subscribe to all players continued
    const allPlayersContinuedSubscription = this.signalRService.onAllPlayersContinued$.subscribe(({ roomCode }) => {
      if (roomCode === this.roomCode) {
        this.isWaitingForContinue = false;
        this.hasCurrentUserContinued = false;
        this.continueProgress = { continued: 0, total: 0 };
        this.allPlayersContinued.emit(); // emit the new event
        // the overlay will be hidden by the parent component
      }
    });
    this.subscriptions.push(allPlayersContinuedSubscription);
  }

  onContinue(): void {
    if (!this.hasCurrentUserContinued && !this.isWaitingForContinue) {
      this.hasCurrentUserContinued = true;
      this.isWaitingForContinue = true;
      this.continue.emit();
    }
  }

  onLeaveRoom(): void {
    this.leaveRoom.emit();
  }
}
