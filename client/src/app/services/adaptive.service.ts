import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';

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

@Injectable({
  providedIn: 'root'
})
export class AdaptiveService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

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
}