import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// DTOs matching the backend
export interface AIFeedbackDTO {
  performanceSummary: PerformanceSummaryDTO;
  wordLevelAnalysis: WordLevelAnalysisDTO;
  characterLevelAnalysis: CharacterLevelAnalysisDTO;
  recentTrends: RecentTrendsDTO;
  immediateActions: ImmediateActionsDTO;
}

export interface LastInsightDTO {
  lastGeneratedAt: Date;
  insight: AIFeedbackDTO;
}

export interface PerformanceSummaryDTO {
  overallLevel: string;
  currentWPM: number;
  currentAccuracy: number;
  totalDrills: number;
  trend: string;
  improvementNeeded: string;
}

export interface WordLevelAnalysisDTO {
  topErrorWords: ErrorWordDTO[];
  wordPatterns: WordPatternDTO[];
}

export interface ErrorWordDTO {
  word: string;
  errorCount: number;
  pattern: string;
  likelyCause: string;
  similarWords: string[];
}

export interface WordPatternDTO {
  pattern: string;
  description: string;
  affectedWords: string[];
  frequency: number;
}

export interface CharacterLevelAnalysisDTO {
  topErrorChars: ErrorCharDTO[];
  keyboardWeaknesses: KeyboardWeaknessDTO[];
}

export interface ErrorCharDTO {
  character: string;
  errorCount: number;
  keyboardZone: string;
  finger: string;
  commonMistakes: string[];
}

export interface KeyboardWeaknessDTO {
  zone: string;
  description: string;
  errorRate: number;
  affectedChars: string[];
}

export interface RecentTrendsDTO {
  wpmTrend: string;
  accuracyTrend: string;
  errorPatterns: string[];
  improvingAreas: string[];
  decliningAreas: string[];
}

export interface ImmediateActionsDTO {
  criticalIssues: string[];
  quickFixes: string[];
  nextDrillFocus: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AIInsightsService {
  private readonly baseUrl = `${environment.apiBaseUrl}/AIInsight`;

  constructor(private http: HttpClient) {}

  generateInsights(): Observable<AIFeedbackDTO> {
    return this.http.get<AIFeedbackDTO>(`${this.baseUrl}/get-ai-insights`)
      .pipe(
        catchError(error => {
          console.error('Error generating AI insights:', error);
          
          // Handle specific error cases from backend
          if (error.error) {
            if (error.error.error) {
              throw new Error(error.error.error);
            }
            if (error.error.message) {
              throw new Error(error.error.message);
            }
          }
          
          throw new Error('Failed to generate AI insights. Please try again.');
        })
      );
  }

  getLastInsight(): Observable<LastInsightDTO> {
    return this.http.get<LastInsightDTO>(`${this.baseUrl}/get-last-ai-insight`)
      .pipe(
        catchError(error => {
          console.error('Error getting last AI insight:', error);
          throw new Error('Failed to get last AI insight. Please try again.');
        })
      );
  }
}
