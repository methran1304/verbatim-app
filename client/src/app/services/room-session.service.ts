import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface RoomSession {
  roomCode: string;
  role: 'Creator' | 'Member';
  timestamp: number;
}

export interface ActiveRoomResponse {
  hasActiveRoom: boolean;
  roomCode?: string;
  role?: string;
  joinedAt?: string;
  lastActivityAt?: string;
  roomState?: string;
  roomAvailability?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomSessionService {
  private readonly COOKIE_NAME = 'room_session';
  private readonly COOKIE_EXPIRY = 10; // minutes

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  setRoomSession(roomCode: string, role: 'Creator' | 'Member'): void {
    const session: RoomSession = {
      roomCode,
      role,
      timestamp: Date.now()
    };
    
    this.cookieService.set(
      this.COOKIE_NAME, 
      JSON.stringify(session), 
      this.COOKIE_EXPIRY / 1440 // Convert minutes to days
    );
  }

  getRoomSession(): RoomSession | null {
    try {
      const cookie = this.cookieService.get(this.COOKIE_NAME);
      if (!cookie) return null;

      const session: RoomSession = JSON.parse(cookie);
      
      // Check if session is expired (10 minutes)
      const now = Date.now();
      const sessionAge = now - session.timestamp;
      const maxAge = this.COOKIE_EXPIRY * 60 * 1000; // 10 minutes in milliseconds
      
      if (sessionAge > maxAge) {
        this.clearRoomSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error parsing room session cookie:', error);
      this.clearRoomSession();
      return null;
    }
  }

  clearRoomSession(): void {
    this.cookieService.delete(this.COOKIE_NAME);
  }

  checkActiveRoom(): Observable<ActiveRoomResponse> {
    // first check cookie for quick access
    const cookieSession = this.getRoomSession();
    if (!cookieSession) {
      return of({ hasActiveRoom: false });
    }

    // validate with server
    return this.http.get<ActiveRoomResponse>(`${environment.apiBaseUrl}/api/competitive-drill/active-room`)
      .pipe(
        map(response => {
          if (!response.hasActiveRoom) {
            // Server says no active room, clear cookie
            this.clearRoomSession();
          }
          return response;
        }),
        catchError(error => {
          console.error('Error checking active room:', error);
          // On error, clear cookie and return no active room
          this.clearRoomSession();
          return of({ hasActiveRoom: false });
        })
      );
  }

  clearServerSession(): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${environment.apiBaseUrl}/api/competitive-drill/clear-session`, {})
      .pipe(
        map(response => response.success),
        catchError(error => {
          console.error('Error clearing server session:', error);
          return of(false);
        })
      );
  }

  updateActivity(): void {
    const session = this.getRoomSession();
    if (session) {
      // update timestamp and reset cookie expiry
      session.timestamp = Date.now();
      this.cookieService.set(
        this.COOKIE_NAME, 
        JSON.stringify(session), 
        this.COOKIE_EXPIRY / 1440
      );
    }
  }

  hasRoomSession(): boolean {
    return this.getRoomSession() !== null;
  }
}
