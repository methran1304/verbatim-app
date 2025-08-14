import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { environment } from '../../../../environments/environment';
export interface CompetitiveStatistics {
  totalDrills: number;
  wins: number;
  losses: number;
  winrate: number;
}

export interface Player {
  userId: string;
  username: string;
  level: number;
  state: 'Connected' | 'Ready' | 'Typing' | 'Finished' | 'Disconnected';
  isReady: boolean;
  isCreator: boolean;
  progress?: number; // for active drill progress
  wpm?: number; // words per minute
  accuracy?: number; // accuracy percentage
  isAFK?: boolean; // afk status
  competitiveStats?: CompetitiveStatistics; // competitive drill statistics
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
    NzToolTipModule,
    NzStatisticModule
  ],
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss']
})
export class PlayerPanelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() players: Player[] = [];
  @Input() currentUserId: string = '';
  @Input() isCreator: boolean = false;
  @Input() isActiveDrill: boolean = false;
  @Input() show: boolean = false;
  @Input() roomCode: string = '';
  @Input() drillType: string = '';
  @Input() difficulty: string = '';
  @Input() durationOrLength: string = '';
  @Input() wordsCompleted: { [userId: string]: number } = {};

  @Output() kickPlayer = new EventEmitter<string>();

  private readonly baseUrl = environment.apiBaseUrl;
  private readonly avatarColors = ['primary', 'success', 'warning', 'error'];
  private playerColorMap: { [userId: string]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCompetitiveStatistics();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only reload statistics when players array actually changes (not just updates)
    if (changes['players'] && !changes['players'].firstChange) {
      
      const previousPlayers = changes['players'].previousValue || [];
      const currentPlayers = changes['players'].currentValue || [];
      
      // Only reload if the actual player list changed (players added/removed), not just stats updates
      const previousPlayerIds = previousPlayers.map((p: Player) => p.userId).sort();
      const currentPlayerIds = currentPlayers.map((p: Player) => p.userId).sort();
      
      if (JSON.stringify(previousPlayerIds) !== JSON.stringify(currentPlayerIds)) {
        console.log(this.players);
        this.loadCompetitiveStatistics();
      }
      else {
        console.log(this.players);
      }
    }
    
    // assign colors when players change
    this.assignPlayerColors();
  }

  ngOnDestroy(): void {}

  private async loadCompetitiveStatistics(): Promise<void> {
    // Only load statistics if we have players and we're not in an active drill
    if (this.players.length === 0 || this.isActiveDrill) {
      return;
    }

    // load competitive statistics for all players
    for (const player of this.players) {
      // Skip if we already have stats for this player
      if (player.competitiveStats) {
        continue;
      }

      try {
        const stats = await this.http.get<CompetitiveStatistics>(
          `${this.baseUrl}/competitive/statistics/${player.userId}`
        ).toPromise();
        
        if (stats) {
          player.competitiveStats = stats;
        }

        console.log('stat success', stats);
      } catch (error) {
        console.log(error);
        console.warn(`Failed to load competitive stats for player ${player.userId}:`, error);
        // set default stats if loading fails
        player.competitiveStats = {
          totalDrills: 0,
          wins: 0,
          losses: 0,
          winrate: 0
        };
      }
    }
  }

  onKickPlayer(userId: string): void {
    this.kickPlayer.emit(userId);
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

  getPlayerTooltip(player: Player): string {
    let tooltip = `${player.username} (Level ${player.level})`;
    
    if (this.isActiveDrill && player.wpm !== undefined && player.accuracy !== undefined) {
      tooltip += `\nWPM: ${player.wpm} | Accuracy: ${player.accuracy}%`;
      
      if (this.drillType.toLowerCase() === 'timed') {
        const wordsCompleted = this.wordsCompleted[player.userId] || 0;
        tooltip += `\nWords: ${wordsCompleted}`;
      }
    }
    
    return tooltip;
  }

  getPlayerPosition(player: Player): string {
    if (!this.isActiveDrill) {
      return '';
    }

    // get all players with their progress/wpm for ranking
    const playersWithStats = this.players
      .filter(p => p.progress !== undefined)
      .map(p => ({
        userId: p.userId,
        progress: p.progress || 0,
        wpm: p.wpm || 0,
        accuracy: p.accuracy || 0
      }))
      .sort((a, b) => {
        // sort by progress first, then by WPM, then by accuracy
        if (b.progress !== a.progress) {
          return b.progress - a.progress;
        }
        if (b.wpm !== a.wpm) {
          return b.wpm - a.wpm;
        }
        return b.accuracy - a.accuracy;
      });

    // find the player's position
    const position = playersWithStats.findIndex(p => p.userId === player.userId) + 1;
    
    // convert to ordinal (1st, 2nd, 3rd, 4th)
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = position % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    
    // return position with suffix for styling
    return position + suffix;
  }

  getPlayerPositionNumber(player: Player): string {
    if (!this.isActiveDrill) {
      return '';
    }

    // get all players with their progress/wpm for ranking
    const playersWithStats = this.players
      .filter(p => p.progress !== undefined)
      .map(p => ({
        userId: p.userId,
        progress: p.progress || 0,
        wpm: p.wpm || 0,
        accuracy: p.accuracy || 0
      }))
      .sort((a, b) => {
        // sort by progress first, then by WPM, then by accuracy
        if (b.progress !== a.progress) {
          return b.progress - a.progress;
        }
        if (b.wpm !== a.wpm) {
          return b.wpm - a.wpm;
        }
        return b.accuracy - a.accuracy;
      });

    // find the player's position
    const position = playersWithStats.findIndex(p => p.userId === player.userId) + 1;
    return position.toString();
  }

  getPlayerPositionSuffix(player: Player): string {
    if (!this.isActiveDrill) {
      return '';
    }

    // get all players with their progress/wpm for ranking
    const playersWithStats = this.players
      .filter(p => p.progress !== undefined)
      .map(p => ({
        userId: p.userId,
        progress: p.progress || 0,
        wpm: p.wpm || 0,
        accuracy: p.accuracy || 0
      }))
      .sort((a, b) => {
        // sort by progress first, then by WPM, then by accuracy
        if (b.progress !== a.progress) {
          return b.progress - a.progress;
        }
        if (b.wpm !== a.wpm) {
          return b.wpm - a.wpm;
        }
        return b.accuracy - a.accuracy;
      });

    // find the player's position
    const position = playersWithStats.findIndex(p => p.userId === player.userId) + 1;
    
    // convert to ordinal suffix
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = position % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  }

  isPlayerFirst(player: Player): boolean {
    if (!this.isActiveDrill) {
      return false;
    }

    // get all players with their progress/wpm for ranking
    const playersWithStats = this.players
      .filter(p => p.progress !== undefined)
      .map(p => ({
        userId: p.userId,
        progress: p.progress || 0,
        wpm: p.wpm || 0,
        accuracy: p.accuracy || 0
      }))
      .sort((a, b) => {
        // sort by progress first, then by WPM, then by accuracy
        if (b.progress !== a.progress) {
          return b.progress - a.progress;
        }
        if (b.wpm !== a.wpm) {
          return b.wpm - a.wpm;
        }
        return b.accuracy - a.accuracy;
      });

    // check if player is first
    return playersWithStats.findIndex(p => p.userId === player.userId) === 0;
  }

  getPlayerProgress(player: Player): number {
    if (!this.isActiveDrill || player.progress === undefined) {
      return 0;
    }

    // for marathon drills, use absolute progress
    if (this.drillType.toLowerCase() === 'marathon') {
      // ensure progress doesn't exceed 100% to prevent overflow
      return Math.min(player.progress, 100);
    }

    // for timed drills, calculate relative progress based on highest word count to prevent overflow
    const allWordsCompleted = Object.values(this.wordsCompleted);
    const maxWords = Math.max(...allWordsCompleted, 1); // avoid division by zero
    const playerWords = this.wordsCompleted[player.userId] || 0;
    
    // calculate relative progress (0-100%)
    return Math.floor((playerWords / maxWords) * 100);
  }

  getProgressLabel(player: Player): string {
    if (!this.isActiveDrill || player.progress === undefined) {
      return '';
    }

    if (this.drillType.toLowerCase() === 'marathon') {
      return `${player.progress}%`;
    }

    // for timed drills, show words completed
    const wordsCompleted = this.wordsCompleted[player.userId] || 0;
    return `${wordsCompleted} words`;
  }

  getGridPlayers(): (Player | null)[] {
    const gridSize = 4; // always 2x2 grid
    const result: (Player | null)[] = [];
    
    // add actual players
    for (let i = 0; i < this.players.length && i < gridSize; i++) {
      result.push(this.players[i]);
    }
    
    // fill remaining slots with null (for placeholders)
    while (result.length < gridSize) {
      result.push(null);
    }
    
    return result;
  }

  isPlayerReady(player: Player): boolean {
    return player.state === 'Ready';
  }

  getPlayerAvatarText(player: Player): string {
    return player.username.charAt(0).toUpperCase();
  }

  private assignPlayerColors(): void {
    // Get current players who don't have colors assigned
    const newPlayers = this.players.filter(player => !this.playerColorMap[player.userId]);
    
    if (newPlayers.length === 0) return;

    // get already used colors
    const usedColors = Object.values(this.playerColorMap);
    
    // get available colors (shuffle to randomize)
    const availableColors = this.avatarColors.filter(color => !usedColors.includes(color));
    this.shuffleArray(availableColors);

    // assign colors to new players
    newPlayers.forEach((player, index) => {
      if (index < availableColors.length) {
        this.playerColorMap[player.userId] = availableColors[index];
      } else {
        // if we run out of unique colors, cycle through them
        this.playerColorMap[player.userId] = this.avatarColors[index % this.avatarColors.length];
      }
    });
  }

  private shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getPlayerAvatarColor(player: Player): string {
    return this.playerColorMap[player.userId] || 'primary';
  }
}
