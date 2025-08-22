import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AIInsightsService, AIFeedbackDTO, LastInsightDTO } from '../../services/ai-insights.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ai-insights',
  templateUrl: './ai-insights.component.html',
  styleUrls: ['./ai-insights.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzButtonModule,
    NzProgressModule,
    NzTagModule,
    NzTableModule,
    NzStatisticModule,
    NzAlertModule,
    NzSpinModule,
    NzEmptyModule,
    NzIconModule,
    NzToolTipModule,
    NzPopoverModule,
    NzSkeletonModule,
    NzResultModule,
    NzDividerModule
  ]
})
export class AIInsightsComponent implements OnInit, OnDestroy {
  // tab management
  activeTab = 'overview';
  readonly tabTitles = ['Overview', 'Word Error Pattern', 'Character Error Pattern', 'Trends'];

  // data states
  aiFeedback: AIFeedbackDTO | null = null;
  lastGeneratedAt: Date | null = null;
  isGenerating = false;
  isRegenerating = false;
  hasGeneratedBefore = false;
  errorMessage: string | null = null;

  // lifecycle management
  private destroy$ = new Subject<void>();

  // table configurations
  wordErrorTableColumns = [
    { title: 'Word', key: 'word', width: '20%' },
    { title: 'Errors', key: 'errorCount', width: '15%' },
    { title: 'Pattern', key: 'pattern', width: '25%' },
    { title: 'Likely Cause', key: 'likelyCause', width: '40%' }
  ];

  characterErrorTableColumns = [
    { title: 'Character', key: 'character', width: '15%' },
    { title: 'Errors', key: 'errorCount', width: '15%' },
    { title: 'Zone', key: 'keyboardZone', width: '20%' },
    { title: 'Finger', key: 'finger', width: '20%' },
    { title: 'Common Mistakes', key: 'commonMistakes', width: '30%' }
  ];

  keyboardWeaknessTableColumns = [
    { title: 'Zone', key: 'zone', width: '20%' },
    { title: 'Error Rate', key: 'errorRate', width: '20%' },
    { title: 'Description', key: 'description', width: '40%' },
    { title: 'Affected Chars', key: 'affectedChars', width: '20%' }
  ];

  constructor(
    private notification: NzNotificationService,
    private aiInsightsService: AIInsightsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.checkExistingInsights();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  // check for existing insights
  async checkExistingInsights(): Promise<void> {
    try {
      this.aiInsightsService.getLastInsight()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (lastInsight: LastInsightDTO) => {
            console.log('lastInsight', lastInsight);

            if (!lastInsight) {
              this.hasGeneratedBefore = false;
              this.aiFeedback = null;
              return;
            }

            this.aiFeedback = lastInsight.insight;
            this.lastGeneratedAt = new Date(lastInsight.lastGeneratedAt);
            this.hasGeneratedBefore = true;
          }
        });
    } catch (error) {
      console.error('Error checking existing insights:', error);
      this.notification.error('Error', 'Failed to check existing insights. Please try again.');
    }
  }

  // generate new ai insights
  generateNewInsights(): void {
    if (this.hasGeneratedBefore) {
      this.isRegenerating = true;
    } else {
      this.isGenerating = true;
    }
    this.errorMessage = null;

    // generate new insights directly
    this.aiInsightsService.generateInsights()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newInsights: AIFeedbackDTO) => {
          // update local state
          this.aiFeedback = newInsights;
          this.lastGeneratedAt = new Date();
          this.hasGeneratedBefore = true;

          console.log('newInsights', newInsights);

                      // show success message
          this.notification.success('Success', 'AI Insights generated successfully!');
          this.isGenerating = false;
          this.isRegenerating = false;
        },
        error: (error) => {
          console.error('Failed to generate AI insights:', error);
          this.errorMessage = error?.message || 'Failed to generate AI insights. Please try again.';
          this.isGenerating = false;
          this.isRegenerating = false;

          // show error notification
          this.notification.error('Error', this.errorMessage || 'Failed to generate AI insights. Please try again.');
        }
      });
  }

  // actions
  onGeneratePracticeDrill(): void {
    // todo: implement practice drill generation
    console.log('Generate practice drill clicked');
  }

  onPracticeWords(words: string[]): void {
    // todo: implement word practice
    console.log('Practice words:', words);
  }

  onPracticeCharacters(chars: string[]): void {
    // todo: implement character practice
    console.log('Practice characters:', chars);
  }

  onFocusOnZone(zone: string): string {
    // todo: implement zone-focused practice
    console.log('Focus on zone:', zone);
    return zone;
  }

  onGoToPractice(): void {
    // todo: navigate to practice section
    console.log('Navigate to practice');
  }

  onViewDrillHistory(): void {
    // todo: navigate to drill history
    console.log('Navigate to drill history');
  }

  // error handling
  clearError(): void {
    this.errorMessage = null;
  }

  // tab management methods
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getTabDisplayName(tab: string): string {
    const tabNames: { [key: string]: string } = {
      'overview': 'Overview',
      'word-issues': 'Word Issues',
      'character-issues': 'Character Issues',
      'trends': 'Trends'
    };
    return tabNames[tab] || tab;
  }

  // utility methods
  get generateButtonText(): string {
    if (this.isGenerating) return 'Generating...';
    if (this.hasGeneratedBefore) return 'Generate New Insights';
    return 'Generate AI Insights';
  }

  get isGenerateButtonDisabled(): boolean {
    return this.isGenerating;
  }

  get lastUpdatedText(): string {
    if (!this.lastGeneratedAt) return '';

    try {
      // Ensure we have a proper Date object
      const lastGenerated = this.lastGeneratedAt instanceof Date ? this.lastGeneratedAt : new Date(this.lastGeneratedAt);
      
      if (isNaN(lastGenerated.getTime())) {
        return 'Unknown';
      }

      const now = new Date();
      const diff = now.getTime() - lastGenerated.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));

      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } catch (error) {
      console.error('Error formatting last updated text:', error);
      return 'Unknown';
    }
  }

  getTrendIcon(trend: string): string {
    if (trend.toLowerCase().includes('improving')) return 'arrow-up';
    if (trend.toLowerCase().includes('declining')) return 'arrow-down';
    return 'minus-circle';
  }

  getTrendColor(trend: string): string {
    if (trend.toLowerCase().includes('improving')) return 'var(--color-success)';
    if (trend.toLowerCase().includes('declining')) return 'var(--color-error)';
    return 'var(--color-text)';
  }

  getLevelColor(level: string): string {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('beginner')) return 'var(--color-warning)';
    if (levelLower.includes('intermediate')) return 'var(--color-primary)';
    if (levelLower.includes('advanced')) return 'var(--color-success)';
    if (levelLower.includes('expert')) return 'var(--color-primary)';
    return 'var(--color-text)';
  }

  getAccuracyColor(accuracy: number): string {
    if (accuracy >= 95) return 'var(--color-success)';
    if (accuracy >= 85) return 'var(--color-warning)';
    return 'var(--color-error)';
  }

  getWPMColor(wpm: number): string {
    if (wpm >= 50) return 'var(--color-success)';
    if (wpm >= 30) return 'var(--color-warning)';
    return 'var(--color-error)';
  }

  getProgressColor(rate: number): string {
    if (rate <= 30) return 'var(--color-success)';
    if (rate <= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  }

  // helper method to check if an insight is empty
  private isInsightEmpty(insight: AIFeedbackDTO): boolean {
    if (!insight) return true;
    
    // check if the insight has meaningful data by looking at key properties
    return !insight.performanceSummary?.overallLevel && 
           !insight.performanceSummary?.currentWPM && 
           !insight.performanceSummary?.currentAccuracy &&
           (!insight.wordLevelAnalysis?.topErrorWords || insight.wordLevelAnalysis.topErrorWords.length === 0) &&
           (!insight.characterLevelAnalysis?.topErrorChars || insight.characterLevelAnalysis.topErrorChars.length === 0);
  }

  // convert markdown-style bold (**text**) to html bold tags
  formatBoldText(text: string): SafeHtml {
    if (!text) return '';
    return this.sanitizer.bypassSecurityTrustHtml(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
  }

      // todo: implement actual service integration
      // this method will be replaced when we implement the real ai insights service
}
