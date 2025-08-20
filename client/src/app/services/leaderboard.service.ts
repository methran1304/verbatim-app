import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OverallLeaderboardEntry {
  position: number;
  username: string;
  userLevel: string;
  userPoints: number;
  maxWpm: number;
  avgWpm: number;
  maxAccuracy: number;
  avgAccuracy: number;
  totalDrills: number;
  errorRate: number;
}

export interface CompetitiveLeaderboardEntry {
  position: number;
  username: string;
  rank: string;
  competitivePoints: number;
  totalDrills: number;
  avgWpm: number;
  avgAccuracy: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface LeaderboardResponse {
  entries: OverallLeaderboardEntry[] | CompetitiveLeaderboardEntry[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = `${environment.apiBaseUrl}/profile`;

  constructor(private http: HttpClient) { }

  getCasualLeaderboard(page: number = 1, pageSize: number = 20): Observable<LeaderboardResponse> {
    return this.http.get<LeaderboardResponse>(`${this.apiUrl}/leaderboard/casual?page=${page}&pageSize=${pageSize}`);
  }

  getCompetitiveLeaderboard(page: number = 1, pageSize: number = 20): Observable<LeaderboardResponse> {
    return this.http.get<LeaderboardResponse>(`${this.apiUrl}/leaderboard/competitive?page=${page}&pageSize=${pageSize}`);
  }
}
