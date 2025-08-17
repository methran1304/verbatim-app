import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BookProgress {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  totalWords: number;
  completedWords: number;
  isCompleted: boolean;
}

export interface AIInsight {
  lastGeneratedAt: Date;
  insight: any;
  aiInsightsGeneratedToday: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiBaseUrl}/profile`;

  constructor(private http: HttpClient) { }

  getBookProgress(): Observable<BookProgress[]> {
    return this.http.get<BookProgress[]>(`${this.apiUrl}/book-progress`);
  }

  startBook(bookId: string, totalWords: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/start-book`, { bookId, totalWords });
  }

  updateBookProgress(bookId: string, completedWords: number, isCompleted: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-book-progress`, { bookId, completedWords, isCompleted });
  }

  resetBook(bookId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-book`, { bookId });
  }

  // new performance data methods
  getActivity(): Observable<Record<string, Record<string, number>>> {
    return this.http.get<Record<string, Record<string, number>>>(`${this.apiUrl}/activity`);
  }

  getMetricOverTime(timePeriod: string): Observable<Record<string, { avg_wpm: number; avg_acc: number }>> {
    return this.http.get<Record<string, { avg_wpm: number; avg_acc: number }>>(`${this.apiUrl}/metrics-over-time?timePeriod=${timePeriod}`);
  }

  getDrillDistribution(timePeriod: string): Observable<{
    drillTypes: Record<string, number>;
    drillDifficulty: Record<string, number>;
  }> {
    return this.http.get<{
      drillTypes: Record<string, number>;
      drillDifficulty: Record<string, number>;
    }>(`${this.apiUrl}/drill-distribution?timePeriod=${timePeriod}`);
  }
  
  // new methods for profile statistics and AI insights
  getProfileStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
  
  getAIInsight(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ai-insight`);
  }
}
