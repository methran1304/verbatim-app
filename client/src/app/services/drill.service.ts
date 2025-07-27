import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { DrillSubmissionRequest, DrillSubmissionResponse } from '../models/interfaces/drill-submission.interface';

@Injectable({
    providedIn: 'root',
})
export class DrillService {
    private baseUrl = `${environment.apiBaseUrl}/drill`;

    constructor(private http: HttpClient) {}

    submitDrillResult(drillSubmission: DrillSubmissionRequest): Observable<DrillSubmissionResponse> {
        return this.http.post<DrillSubmissionResponse>(`${this.baseUrl}/submit`, drillSubmission);
    }

    getDrillHistory(): Observable<any> {
        return this.http.get(`${this.baseUrl}/drill/history`);
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