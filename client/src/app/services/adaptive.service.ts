import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import { DrillLength, DrillLengthWordCount } from '../models/enums/drill-length.enum';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { LoadingDelayUtil } from '../core/utils/loading-delay.util';
import { ZorroNotificationServiceTsService } from '../shared/zorro-notification.service.ts.service';

export interface FuzzySearchResponse {
  similarWords: { [key: string]: string[] };
}

export interface AdaptiveDrillResponse {
  success: boolean;
  message: string;
  fuzzySearchResponse?: FuzzySearchResponse;
}

export interface ErrorProneWordsResponse {
  success: boolean;
  message: string;
  errorProneWords?: string[];
}

export interface AdaptiveDrillState {
  isGeneratingAdaptive: boolean;
  showAdaptiveDrillOverlay: boolean;
  showErrorWordsModal: boolean;
  isLoadingErrorWords: boolean;
  errorProneWords: string[];
  currentAdaptiveResponse?: AdaptiveDrillResponse;
}

@Injectable({
  providedIn: 'root'
})
export class AdaptiveService {
  private apiUrl = environment.apiBaseUrl;
  
  private adaptiveState$ = new BehaviorSubject<AdaptiveDrillState>({
    isGeneratingAdaptive: false,
    showAdaptiveDrillOverlay: false,
    showErrorWordsModal: false,
    isLoadingErrorWords: false,
    errorProneWords: []
  });

  constructor(
    private http: HttpClient,
    private notificationService: ZorroNotificationServiceTsService
  ) {}

  getAdaptiveDrillWords(difficulty: DrillDifficulty, count: number): Observable<AdaptiveDrillResponse> {
    const params = new HttpParams()
      .set('difficulty', difficulty)
      .set('count', count.toString());

    return this.http.get<AdaptiveDrillResponse>(`${this.apiUrl}/adaptive/get-adaptive-drill-words`, { params });
  }

  getErrorProneWords(difficulty: DrillDifficulty): Observable<ErrorProneWordsResponse> {
    const params = new HttpParams()
      .set('difficulty', difficulty);

    return this.http.get<ErrorProneWordsResponse>(`${this.apiUrl}/adaptive/get-error-prone-words`, { params });
  }

  /**
   * Get adaptive drill state as observable
   */
  getAdaptiveState(): Observable<AdaptiveDrillState> {
    return this.adaptiveState$.asObservable();
  }

  /**
   * Get current adaptive drill state
   */
  getCurrentAdaptiveState(): AdaptiveDrillState {
    return this.adaptiveState$.value;
  }

  /**
   * Update adaptive drill state
   */
  private updateAdaptiveState(updates: Partial<AdaptiveDrillState>): void {
    this.adaptiveState$.next({
      ...this.adaptiveState$.value,
      ...updates
    });
  }

  /**
   * Show adaptive drill overlay
   */
  showAdaptiveDrillOverlay(): void {
    this.updateAdaptiveState({
      showAdaptiveDrillOverlay: true,
      isGeneratingAdaptive: false
    });
  }

  /**
   * Hide adaptive drill overlay
   */
  hideAdaptiveDrillOverlay(): void {
    this.updateAdaptiveState({
      showAdaptiveDrillOverlay: false
    });
  }

  /**
   * Show error words modal
   */
  showErrorWordsModal(): void {
    this.updateAdaptiveState({
      showErrorWordsModal: true
    });
  }

  /**
   * Hide error words modal
   */
  hideErrorWordsModal(): void {
    this.updateAdaptiveState({
      showErrorWordsModal: false
    });
  }

  /**
   * Generate adaptive drill words
   */
  async generateAdaptiveDrill(drillPreferences: DrillPreference): Promise<string[]> {
    this.updateAdaptiveState({ isGeneratingAdaptive: true });

    try {
      const result = await LoadingDelayUtil.withLoadingState(
        this.getAdaptiveDrillWords(
          drillPreferences.drillDifficulty,
          DrillLengthWordCount[drillPreferences.drillLength]
        ),
        (loading: boolean) => this.updateAdaptiveState({ isGeneratingAdaptive: loading }),
        500 // 500ms minimum loading time
      );

      if (result.success) {
        this.updateAdaptiveState({
          currentAdaptiveResponse: result,
          showAdaptiveDrillOverlay: false
        });
        
        const adaptiveWords = Object.values(result.fuzzySearchResponse?.similarWords ?? {}).flat() as string[];
        return adaptiveWords;
      } else {
        this.notificationService.createNotification('error', 'Error', result.message);
        return [];
      }
    } catch (error: any) {
      this.notificationService.createNotification('error', 'Error', 'Failed to generate adaptive drill. Please try again.');
      return [];
    }
  }

  /**
   * Load error-prone words
   */
  async loadErrorProneWords(drillPreferences: DrillPreference): Promise<string[]> {
    this.updateAdaptiveState({ isLoadingErrorWords: true });

    try {
      const result = await LoadingDelayUtil.withLoadingState(
        this.getErrorProneWords(drillPreferences.drillDifficulty),
        (loading: boolean) => this.updateAdaptiveState({ isLoadingErrorWords: loading }),
        500 // 500ms minimum loading time
      );

      if (result.success && result.errorProneWords) {
        this.updateAdaptiveState({
          errorProneWords: result.errorProneWords,
          showErrorWordsModal: true
        });
        return result.errorProneWords;
      } else {
        this.notificationService.createNotification('error', 'Error', result.message || 'Failed to fetch error-prone words.');
        return [];
      }
    } catch (error: any) {
      this.notificationService.createNotification('error', 'Error', 'Failed to fetch error-prone words. Please try again.');
      return [];
    }
  }

  /**
   * Get error words for display
   */
  getErrorWords(): string[] {
    const currentState = this.adaptiveState$.value;
    
    // If we have error-prone words from the API, use those
    if (currentState.errorProneWords.length > 0) {
      return currentState.errorProneWords;
    }
    
    // Fallback to adaptive response data if available
    if (!currentState.currentAdaptiveResponse?.fuzzySearchResponse?.similarWords) {
      return [];
    }
    return Object.keys(currentState.currentAdaptiveResponse.fuzzySearchResponse.similarWords);
  }

  /**
   * Reset adaptive drill state
   */
  resetAdaptiveState(): void {
    this.adaptiveState$.next({
      isGeneratingAdaptive: false,
      showAdaptiveDrillOverlay: false,
      showErrorWordsModal: false,
      isLoadingErrorWords: false,
      errorProneWords: []
    });
  }
}