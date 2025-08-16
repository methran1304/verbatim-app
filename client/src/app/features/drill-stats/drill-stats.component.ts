import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerformanceChartComponent } from '../../shared/performance-chart/performance-chart.component';

// ng-Zorro imports
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTagModule } from 'ng-zorro-antd/tag';


// models and interfaces
import { DrillSubmissionResponse, StatDifference } from '../../models/interfaces/drill-submission.interface';
import { DrillPreference } from '../../models/interfaces/drill-preference.interface';
import { DrillStatistic } from '../../models/interfaces/drill-stats.interface';
import { DrillType } from '../../models/enums/drill-type.enum';
import { DrillLength, DrillLengthWordCount } from '../../models/enums/drill-length.enum';

// services
import { ThemeService } from '../../services/theme.service';
import { ZorroNotificationServiceTsService } from '../../shared/zorro-notification.service.ts.service';

@Component({
  selector: 'app-drill-stats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    PerformanceChartComponent,
    NzCardModule,
    NzStatisticModule,
    NzProgressModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzIconModule,
    NzToolTipModule,
    NzDividerModule,
    NzSpinModule,
    NzResultModule,
    NzTagModule
  ],
  templateUrl: './drill-stats.component.html',
  styleUrls: ['./drill-stats.component.scss']
})
export class DrillStatsComponent implements OnInit, OnDestroy {
  drillStats?: DrillSubmissionResponse;
  drillPreferences?: DrillPreference;
  currentDrillStats?: DrillStatistic;
  
  // loading and error states
  isLoading: boolean = true;
  hasError: boolean = false;
  // title color
  // chart data
  pieChartData: Array<{ name: string; value: number }> = [];
  
  // animation states
  animatedStats = {
    points: 0,
    wpm: 0,
    accuracy: 0,
    corrections: 0
  };
  
  // progress data
  progressData = {
    currentLevel: 1,
    nextLevel: 2,
    pointsToNext: 0,
    progressPercentage: 0
  };
  
  // theme
  isDarkMode: boolean = false;
  
  // color scheme for charts
  colorScheme = 'cool';
  
  // animation intervals
  private animationIntervals: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService
  ) {}
  
  ngOnInit(): void {
    // get drill stats from route data using history state
    const state = history.state;
    if (state && state.drillStats) {
      this.drillStats = state.drillStats;
      this.drillPreferences = state.drillPreferences;
      this.currentDrillStats = state.currentDrillStats;
    } else {
      // fallback: try to get from route params or redirect
      console.warn('No drill stats data found in history state');
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    // validate that we have the required data
    if (!this.drillStats || !this.drillStats.userPoints) {
      console.error('Invalid drill stats data:', this.drillStats);
      this.hasError = true;
      this.isLoading = false;
      return;
    }
    
    // subscribe to theme changes
    this.themeService.getDarkMode().subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
      this.updateColorScheme();
    });
    
    // initialize data
    this.initializeChartData();
    this.calculateProgress();
    this.startAnimations();
    this.isLoading = false;
  }
  
  ngOnDestroy(): void {
    // clear all animation intervals
    this.animationIntervals.forEach(interval => clearInterval(interval));
  }
  
  private initializeChartData(): void {
    if (!this.drillStats) return;
    
    // create pie chart data for correct vs incorrect words
    this.pieChartData = [
      {
        name: 'Correct Words',
        value: this.drillStats.totalCorrectWords.new
      },
      {
        name: 'Incorrect Words',
        value: this.drillStats.totalIncorrectWords.new
      }
    ];
  }
  
  private calculateProgress(): void {
    if (!this.drillStats) return;
    
    // calculate level progress based on points
    const totalPoints = this.drillStats.userPoints.new;
    const pointsPerLevel = 1000; // adjust based on game design requirements
    
    this.progressData.currentLevel = Math.floor(totalPoints / pointsPerLevel) + 1;
    this.progressData.nextLevel = this.progressData.currentLevel + 1;
    this.progressData.pointsToNext = pointsPerLevel - (totalPoints % pointsPerLevel);
    this.progressData.progressPercentage = ((totalPoints % pointsPerLevel) / pointsPerLevel) * 100;
  }
  
  private startAnimations(): void {
    if (!this.drillStats) return;
    
    // animate points gained in this drill
    this.animateValue('points', this.drillStats.userPoints.difference, 1000);
    
    // animate wpm
    this.animateValue('wpm', this.drillStats.avgWPM.new, 1000);
    
    // animate accuracy
    this.animateValue('accuracy', this.drillStats.avgAccuracy.new, 1000);
    
    // animate corrections
    this.animateValue('corrections', this.drillStats.avgCorrections.new, 1000);
  }
  
  private animateValue(property: keyof typeof this.animatedStats, targetValue: number, duration: number): void {
    const startValue = 0;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      this.animatedStats[property] = Number((startValue + (targetValue - startValue) * easeOutQuart).toFixed(2));
      
      if (progress >= 1) {
        clearInterval(interval);
        this.animatedStats[property] = Number(targetValue.toFixed(2));
      }
    }, 16); // ~60fps
    
    this.animationIntervals.push(interval);
  }
  
  private updateColorScheme(): void {
    if (this.isDarkMode) {
      this.colorScheme = 'cool';
    } else {
      this.colorScheme = 'vivid';
    }
  }
  
  // helper methods for formatting
  formatWPM(value: number): string {
    return `${value.toFixed(1)} WPM`;
  }
  
  formatAccuracy(value: number): string {
    return `${value.toFixed(1)}%`;
  }
  
  formatPoints(value: number): string {
    return value.toLocaleString();
  }

  // get current drill error rate (now stored in drillStatistic)
  getCurrentErrorRate(): number {
    return this.currentDrillStats?.errorRate || 0;
  }

  // get current error rate in fraction format (e.g., "1/19")
  getCurrentErrorRateFraction(): string {
    if (!this.currentDrillStats) return '0/0';
    return `${this.currentDrillStats.incorrectWords}/${this.currentDrillStats.wordsCount}`;
  }

  // get average error rate from backend
  getAverageErrorRate(): number {
    return this.drillStats?.avgErrorRate?.new || 0;
  }
  
  getStatChangeText(stat: StatDifference | undefined): string {
    if (!stat) return '';
    const change = Math.abs(stat.difference);
    if (change === 0) return '';
    
    // for change values, use appropriate formatting based on size
    if (change >= 1000) {
      return this.formatLargeNumber(change).display;
    } else if (change >= 1) {
      return change.toFixed(0);
    } else {
      return change.toFixed(1);
    }
  }
  
  getStatChangeColor(stat: StatDifference | undefined): string {
    if (!stat) return '#8c8c8c';
    if (stat.difference > 0) return '#52c41a';
    if (stat.difference < 0) return '#f5222d';
    return '#8c8c8c';
  }

  getNegativeMetricChangeColor(stat: StatDifference | undefined): string {
    if (!stat) return '#8c8c8c';
    if (stat.difference < 0) return '#52c41a'; 
    if (stat.difference > 0) return '#f5222d'; 
    return '#8c8c8c';
  }

  getDurationChangeColor(stat: StatDifference | undefined): string {
    if (!stat) return '#8c8c8c';
    // for duration: always use orange color
    return '#FA8C16';
  }
  
  isNewRecord(stat: StatDifference | undefined): boolean {
    if (!stat) return false;
    return stat.difference > 0 && stat.new > stat.current;
  }
  
  onContinue(): void {
    // navigate back to drill engine with same preferences
    this.router.navigate(['/drill'], {
      state: { drillPreferences: this.drillPreferences }
    });
  }

  // --- Drill Settings Display ---
  get drillTypeLabel(): string {
    if (!this.drillPreferences) return '';
    switch (this.drillPreferences.drillType) {
      case DrillType.Timed: return 'Timed';
      case DrillType.Marathon: return 'Marathon';
      case DrillType.Adaptive: return 'Adaptive';
      default: return this.drillPreferences.drillType;
    }
  }
  get drillDifficultyLabel(): string {
    if (!this.drillPreferences) return '';
    return this.drillPreferences.drillDifficulty;
  }
  get drillLengthLabel(): string {
    if (!this.drillPreferences) return '';
    const wordCount = DrillLengthWordCount[this.drillPreferences.drillLength];
    return `${this.drillPreferences.drillLength} (${wordCount})`;
  }
  get drillDurationLabel(): string {
    if (!this.drillPreferences) return '';
    // show as simple seconds format like "15s", "30s", etc.
    return `${this.drillPreferences.drillDuration}s`;
  }

  // --- duration formatting ---
  formatDuration(totalSeconds: number): string {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '0m 0s';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  getDrillDurationStat(): StatDifference | undefined {
    return this.drillStats?.totalDrillDuration;
  }

  getDrillDurationChangeText(stat: StatDifference | undefined): string {
    if (!stat) return '';
    const absDiff = Math.abs(stat.difference);
    if (absDiff === 0) return '';
    // show as (120 seconds) or (30 seconds) - no sign needed with arrows
    return `${absDiff} second${absDiff !== 1 ? 's' : ''}`;
  }


  // formats large numbers with k/m/b suffixes and returns both formatted and original values
  formatLargeNumber(value: number): { display: string; tooltip: string } {
    if (value < 1000) {
      return { display: value.toString(), tooltip: value.toLocaleString() };
    }
    
    if (value < 1000000) {
      const kValue = value / 1000;
      const display = kValue >= 10 ? kValue.toFixed(0) + 'K' : kValue.toFixed(1) + 'K';
      return { display, tooltip: value.toLocaleString() };
    }
    
    if (value < 1000000000) {
      const mValue = value / 1000000;
      const display = mValue >= 10 ? mValue.toFixed(0) + 'M' : mValue.toFixed(1) + 'M';
      return { display, tooltip: value.toLocaleString() };
    }
    
    // billions
    const bValue = value / 1000000000;
    const display = bValue >= 10 ? bValue.toFixed(0) + 'B' : bValue.toFixed(1) + 'B';
    return { display, tooltip: value.toLocaleString() };
  }
} 