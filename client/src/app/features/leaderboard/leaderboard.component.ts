import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { LeaderboardService, OverallLeaderboardEntry, CompetitiveLeaderboardEntry, LeaderboardResponse } from '../../services/leaderboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTabsModule,
    NzCardModule,
    NzSpinModule,
    NzTagModule,
    NzIconModule,
    NzSkeletonModule
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Overall leaderboard
  overallLoading = false;
  overallData: OverallLeaderboardEntry[] = [];
  overallTotal = 0;
  overallPageSize = 20;
  overallCurrentPage = 1;
  
  // Competitive leaderboard
  competitiveLoading = false;
  competitiveData: CompetitiveLeaderboardEntry[] = [];
  competitiveTotal = 0;
  competitivePageSize = 20;
  competitiveCurrentPage = 1;
  
  // Active tab
  activeTabIndex = 0;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.loadCasualLeaderboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;
    if (index === 0 && this.overallData.length === 0) {
      this.loadCasualLeaderboard();
    } else if (index === 1 && this.competitiveData.length === 0) {
      this.loadCompetitiveLeaderboard();
    }
  }

  loadCasualLeaderboard(): void {
    this.overallLoading = true;
    this.leaderboardService.getCasualLeaderboard(this.overallCurrentPage, this.overallPageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.overallData = response.entries as OverallLeaderboardEntry[];
          this.overallTotal = response.pagination.totalCount;
          this.overallLoading = false;
        },
        error: (error) => {
          console.error('Error loading overall leaderboard:', error);
          this.overallLoading = false;
        }
      });
  }

  loadCompetitiveLeaderboard(): void {
    this.competitiveLoading = true;
    this.leaderboardService.getCompetitiveLeaderboard(this.competitiveCurrentPage, this.competitivePageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.competitiveData = response.entries as CompetitiveLeaderboardEntry[];
          this.competitiveLoading = false;
        },
        error: (error) => {
          console.error('Error loading competitive leaderboard:', error);
          this.competitiveLoading = false;
        }
      });
  }

  onOverallPageChange(page: number): void {
    this.overallCurrentPage = page;
    this.loadCasualLeaderboard();
  }

  onCompetitivePageChange(page: number): void {
    this.competitiveCurrentPage = page;
    this.loadCompetitiveLeaderboard();
  }

  getOverallLevelClass(level: string): string {
    switch (level.toLowerCase()) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'advanced': return 'level-advanced';
      case 'expert': return 'level-expert';
      default: return 'level-beginner';
    }
  }

  getCompetitiveRankClass(rank: string): string {
    switch (rank.toLowerCase()) {
      case 'bronze': return 'rank-bronze';
      case 'silver': return 'rank-silver';
      case 'gold': return 'rank-gold';
      case 'platinum': return 'rank-platinum';
      case 'diamond': return 'rank-diamond';
      case 'master': return 'rank-master';
      case 'grandmaster': return 'rank-grandmaster';
      default: return 'rank-bronze';
    }
  }



  getPositionClass(position: number): string {
    switch (position) {
      case 1: return 'position-first';
      case 2: return 'position-second';
      case 3: return 'position-third';
      default: return '';
    }
  }

  trackByPosition(index: number, item: any): number {
    return item.position;
  }
}
