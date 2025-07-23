import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { DrillStats } from '../models/interfaces/drill-stats.interface';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';

@Injectable({
    providedIn: 'root',
})
export class DrillService {
    private baseUrl = `${environment.apiBaseUrl}/drill`;

    constructor(private http: HttpClient) {}

    submitDrillResult(drillStats: DrillStats): Observable<any> {
        return this.http.post(`${this.baseUrl}/submit`, drillStats);
    }

    getDrillHistory(): Observable<any> {
        return this.http.get(`${this.baseUrl}/history`);
    }

    getDrillPreferences(): DrillPreference | null {
        // get drill preferences from local storage 
        const drillPreferences = localStorage.getItem('drillPreference');
        if (drillPreferences) {
            return JSON.parse(drillPreferences);
        }
        return null;
    }

    setDrillPreferences(drillPreferences: any): void {
        localStorage.setItem('drillPreference', JSON.stringify(drillPreferences));
    }

} 