import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
export interface Player {
  userId: string;
  username: string;
  level: number;
  isReady: boolean;
  isCreator: boolean;
  progress?: number; // for active drill progress
  wpm?: number; // words per minute
  accuracy?: number; // accuracy percentage
}

@Component({
  selector: 'app-player-panel',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzListModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzBadgeModule,
    NzProgressModule,
    NzToolTipModule
  ],
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss']
})
export class PlayerPanelComponent implements OnInit, OnDestroy {
  @Input() players: Player[] = [];
  @Input() currentUserId: string = '';
  @Input() isCreator: boolean = false;
  @Input() isActiveDrill: boolean = false;
  @Input() show: boolean = false;

  @Output() kickPlayer = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onKickPlayer(userId: string): void {
    this.kickPlayer.emit(userId);
  }

  canKickPlayer(player: Player): boolean {
    return this.isCreator && 
           player.userId !== this.currentUserId && 
           !player.isCreator;
  }

  getPlayerStatus(player: Player): string {
    if (this.isActiveDrill) {
      if (player.progress !== undefined) {
        return `${player.progress}%`;
      }
      return 'Not started';
    } else {
      return player.isReady ? 'READY' : 'NOT READY';
    }
  }

  getPlayerStatusColor(player: Player): string {
    if (this.isActiveDrill) {
      if (player.progress !== undefined) {
        if (player.progress === 100) return 'success';
        if (player.progress > 0) return 'processing';
        return 'default';
      }
      return 'default';
    } else {
      return player.isReady ? 'success' : 'warning';
    }
  }

  getPlayerAvatarText(player: Player): string {
    return player.username.charAt(0).toUpperCase();
  }

  getPlayerTooltip(player: Player): string {
    let tooltip = `${player.username} (Level ${player.level})`;
    
    if (this.isActiveDrill && player.wpm !== undefined && player.accuracy !== undefined) {
      tooltip += `\nWPM: ${player.wpm} | Accuracy: ${player.accuracy}%`;
    }
    
    return tooltip;
  }
}
