import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService, BookProgress, AIInsight } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { DrillType } from '../../models/enums/drill-type.enum';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import * as d3 from 'd3';


interface ProfileStats {
  maxWPM: number;
  maxAccuracy: number;
  avgWPM: number;
  avgAccuracy: number;
  avgCorrections: number;
  avgErrorRate: number;
  userPoints: number;
  competitiveDrills: number;
  wins: number;
  losses: number;
  totalDrillsParticipated: number;
  totalWords: number;
  totalCorrectWords: number;
  totalIncorrectWords: number;
  totalLetters: number;
  totalCorrectLetters: number;
  totalIncorrectLetters: number;
  totalDrillDuration: number;
  drillsByType: Record<DrillType, number>;
  drillsByDifficulty: Record<DrillDifficulty, number>;
  // User information
  username?: string;
  emailAddress?: string;
  memberSince?: Date;
}

@Component({
    selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
    templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() profileStats: ProfileStats | null = null;
  @Input() aiInsight: AIInsight | null = null;
  
  private destroy$ = new Subject<void>();
  
  curve = d3.curveMonotoneX;
  
  activeTab = 'overview';
  selectedTimeRange: 'week' | 'month' | 'year' = 'week';
  selectedMonth = 'Jan';
  
  // chart data
  difficultyChartData: any[] = [];
  drillTypeChartData: any[] = [];
  activityHeatmapData: any[] = [];
  metricsLineChartData: any[] = [];
  
  // color schemes
  lineChartColorScheme: any = {
    domain: ['#52c41a', '#1890ff'] // green for WPM, blue for Accuracy (same as performance chart)
  };
  difficultyColorScheme: any = {
    domain: ['#10b981', '#f59e0b', '#ef4444']
  };
  drillTypeColorScheme: any = {
    domain: ['#3b82f6', '#8b5cf6', '#06b6d4']
  };
  heatmapColorScheme: any = {
    domain: [
      'rgba(var(--color-primary-rgb), 0.1)',    // very light (lowest activity)
      'rgba(var(--color-primary-rgb), 0.25)',   // light
      'rgba(var(--color-primary-rgb), 0.4)',    // medium-light
      'rgba(var(--color-primary-rgb), 0.6)',    // medium
      'rgba(var(--color-primary-rgb), 0.8)',    // medium-dark
      'rgba(var(--color-primary-rgb), 1.0)'     // full (highest activity)
    ]
  };
  
  // y-axis configuration for line chart
  yAxisTicks: number[] = [0, 20, 40, 60, 80, 100];
  yAxisTickFormatter = (value: number) => `${value}%`;
  
  // available months for carousel
  availableMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // month name to number mapping for date key generation
  private monthNameToNumber: Record<string, string> = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  // time range options for TypeScript safety
  timeRangeOptions: ('week' | 'month' | 'year')[] = ['week', 'month', 'year'];
  
  // store the API response to avoid repeated calls
  private storedActivityData: Record<string, Record<string, number>> | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfileStats();
    this.loadAIInsight();
    this.loadPerformanceData();
    this.prepareMetricsLineChartData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProfileStats(): void {
    // use real backend API to get profile statistics
    this.profileService.getProfileStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profileData) => {
          console.log('Profile stats from backend:', profileData);
          
          // map the backend response to our component interface
          this.profileStats = profileData;
        },
        error: (error) => {
          console.error('Error loading profile stats:', error);
          // fallback to mock data if API fails
          this.loadMockProfileData();
        }
      });
  }

  loadAIInsight(): void {
    // for now, use mock data
    this.aiInsight = {
      lastGeneratedAt: new Date(),
      insight: 'Your typing speed has improved by 15% this month!',
      aiInsightsGeneratedToday: 3
    };
  }

  loadPerformanceData(): void {
    this.loadActivityData();
    this.loadMetricsOverTime();
    this.loadDrillDistribution();
  }

  loadActivityData(): void {
    this.profileService.getActivity()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activityData) => {
          console.log('Raw activity data from API:', activityData);
          this.storedActivityData = activityData; // store the API response
          this.prepareActivityHeatmapData(activityData);
        },
        error: (error) => {
          console.error('Error loading activity data:', error);
          // fallback to mock data if API fails
          this.prepareActivityHeatmapData();
        }
      });
  }

  loadMetricsOverTime(): void {
    this.profileService.getMetricOverTime(this.selectedTimeRange)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (metricsData) => {
          console.log('Metrics over time data:', metricsData);
          this.prepareMetricsLineChartData(metricsData);
        },
        error: (error) => {
          console.error('Error loading metrics over time:', error);
        }
      });
  }

  loadDrillDistribution(): void {
    this.profileService.getDrillDistribution(this.selectedTimeRange)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (distributionData) => {
          console.log('Drill distribution data:', distributionData);
          this.prepareDifficultyChartData(distributionData.drillDifficulty);
          this.prepareDrillTypeChartData(distributionData.drillTypes);
        },
        error: (error) => {
          console.error('Error loading drill distribution:', error);
        }
      });
  }

  loadMockProfileData(): void {
    this.profileStats = {
      totalDrillsParticipated: 156,
      totalWords: 23450,
      totalCorrectWords: 22000,
      totalIncorrectWords: 1450,
      totalLetters: 187600,
      totalCorrectLetters: 176000,
      totalIncorrectLetters: 11600,
      avgWPM: 78,
      avgAccuracy: 94,
      avgCorrections: 2.1,
      avgErrorRate: 6.0,
      maxWPM: 120,
      maxAccuracy: 98,
      totalDrillDuration: 1250,
      userPoints: 1250,
      wins: 23,
      losses: 7,
      competitiveDrills: 30,
      drillsByType: {
        [DrillType.Timed]: 45,
        [DrillType.Marathon]: 67,
        [DrillType.Adaptive]: 32,
        [DrillType.Memory]: 12
      },
      drillsByDifficulty: {
        [DrillDifficulty.Beginner]: 23,
        [DrillDifficulty.Intermediate]: 89,
        [DrillDifficulty.Advanced]: 44
      }
    };
  }

  onTimeRangeChange(timeRange: 'week' | 'month' | 'year'): void {
    this.selectedTimeRange = timeRange;
    this.loadMetricsOverTime();
    this.loadDrillDistribution();
  }

  prepareDifficultyChartData(difficultyData?: Record<string, number>): void {
    // clear existing data first
    this.difficultyChartData = [];

    if (difficultyData) {
      this.difficultyChartData = Object.entries(difficultyData).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value
      }));
    }
  }

  prepareDrillTypeChartData(drillTypeData?: Record<string, number>): void {
    // clear existing data first
    this.drillTypeChartData = [];

    if (drillTypeData) {
      this.drillTypeChartData = Object.entries(drillTypeData).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value
      }));
    }
  }

  // month navigation methods
  previousMonth(): void {
    const currentIndex = this.availableMonths.indexOf(this.selectedMonth);
    const previousIndex = currentIndex === 0 ? this.availableMonths.length - 1 : currentIndex - 1;
    this.selectedMonth = this.availableMonths[previousIndex];
    this.updateHeatmapForSelectedMonth();
  }

  nextMonth(): void {
    const currentIndex = this.availableMonths.indexOf(this.selectedMonth);
    const nextIndex = currentIndex === this.availableMonths.length - 1 ? 0 : currentIndex + 1;
    this.selectedMonth = this.availableMonths[nextIndex];
    this.updateHeatmapForSelectedMonth();
  }

  selectMonth(month: string): void {
    this.selectedMonth = month;
    this.updateHeatmapForSelectedMonth();
  }

  private updateHeatmapForSelectedMonth(): void {
    // first: clear the data to trigger component destruction
    this.activityHeatmapData = [];
    
    // use stored activity data to regenerate heatmap for the selected month
    if (this.storedActivityData) {
      // delay to ensure the @if directive sees the empty array and destroys the component
      setTimeout(() => {
        this.prepareActivityHeatmapData(this.storedActivityData!);
      }, 10);
    }
  }

  prepareActivityHeatmapData(activityData?: Record<string, Record<string, number>>): void {
    if (activityData && Object.keys(activityData).length > 0) {
      // create a 4x7 grid for the selected month
      // y-axis: days of the week (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
      // x-axis: weeks of the month (Week 1, Week 2, Week 3, Week 4)
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      
      const heatmapData: any[] = [];

      // create a series for each day of the week
      daysOfWeek.forEach((day, dayIndex) => {
        const series: any[] = [];
        
        // for each week, get the drill count for that specific day
        weekLabels.forEach((week, weekIndex) => {
          // calculate the actual date for this cell
          // week 1: days 1-7, week 2: days 8-14, week 3: days 15-21, week 4: days 22-28
          const dayOfMonth = weekIndex * 7 + dayIndex + 1;
          
          // cap at 28 days for consistent grid
          if (dayOfMonth <= 28) {
            // get the month data from the API
            const monthData = activityData[this.selectedMonth];
            if (monthData) {
              // create date key in DD-MM-YYYY format using month number
              const monthNumber = this.monthNameToNumber[this.selectedMonth];
              if (!monthNumber) {
                console.error(`Invalid month: ${this.selectedMonth}`);
                series.push({ name: week, value: 0 });
                return;
              }
              
              const dateKey = `${dayOfMonth.toString().padStart(2, '0')}-${monthNumber}-2025`;
              
              // Get the drill count for this specific day
              const drillCount = monthData[dateKey] || 0;
              
              series.push({
                name: week,
                value: drillCount
              });
            } else {
              series.push({ name: week, value: 0 });
            }
          }
        });

        heatmapData.push({
          name: day,
          series: series
        });
      });

      console.log(`4x7 grid heatmap data for ${this.selectedMonth} using real API data:`, heatmapData);
      this.activityHeatmapData = heatmapData;
    }
  }

  prepareMetricsLineChartData(metricsData?: Record<string, { avg_wpm: number; avg_acc: number }>): void {
    // clear existing data first
    this.metricsLineChartData = [];

    if (metricsData && Object.keys(metricsData).length > 0) {
      // Use real metrics data
      const sortedDates = Object.keys(metricsData).sort();

      this.metricsLineChartData = [
        {
          name: 'Average WPM',
          series: sortedDates.map(date => ({
            name: date,
            value: metricsData[date].avg_wpm
          }))
        },
        {
          name: 'Average Accuracy',
          series: sortedDates.map(date => ({
            name: date,
            value: metricsData[date].avg_acc
          }))
        }
      ];

      console.log('Generated metrics line chart data:', this.metricsLineChartData);
    }
  }

  getAccuracyColor(): string {
    return 'var(--color-success)';
  }

  getWPMColor(): string {
    return 'var(--color-primary)';
  }

  getDrillTypePercentage(drillType: string): number {
    if (!this.profileStats) return 0;

    const total = Object.values(this.profileStats.drillsByType).reduce((sum, count) => sum + count, 0);
    const count = this.profileStats.drillsByType[drillType as DrillType] || 0;

    return total > 0 ? Math.round((count / total) * 100) : 0;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getWinRate(): number {
    if (!this.profileStats) return 0;
    const total = this.profileStats.wins + this.profileStats.losses;
    return total > 0 ? Math.round((this.profileStats.wins / total) * 100) : 0;
  }

  getErrorRate(): number {
    if (!this.profileStats) return 0;
    
    // check for both camelCase and snake_case naming conventions
    const errorRate = this.profileStats.avgErrorRate || 
                     (this.profileStats as any).avg_error_rate || 
                     0;
    
    return this.roundToDecimal(errorRate);
  }

  getTotalTimeFormatted(): string {
    if (!this.profileStats) return '0h 0m';
    const hours = Math.floor(this.profileStats.totalDrillDuration / 3600);
    const minutes = Math.floor((this.profileStats.totalDrillDuration % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
  
  // helper method to round double values to 1 decimal place
  roundToDecimal(value: number, decimals: number = 1): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
  
  // get rounded profile values
  getRoundedMaxWPM(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.maxWPM);
  }
  
  getRoundedMaxAccuracy(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.maxAccuracy);
  }
  
  getRoundedAvgWPM(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.avgWPM);
  }
  
  getRoundedAvgAccuracy(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.avgAccuracy);
  }
  
  getRoundedAvgCorrections(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.avgCorrections);
  }
  
  getRoundedAvgErrorRate(): number {
    if (!this.profileStats) return 0;
    return this.roundToDecimal(this.profileStats.avgErrorRate);
  }
  
  // format member since date
  getMemberSinceFormatted(): string {
    if (!this.profileStats?.memberSince) return 'Jan 2024';
    const date = new Date(this.profileStats.memberSince);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  // get avatar initial from username
  getAvatarInitial(): string {
    if (!this.profileStats?.username) return 'U';
    return this.profileStats.username.charAt(0).toUpperCase();
  }
}
