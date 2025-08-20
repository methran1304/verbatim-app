import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DrillService } from './drill.service';
import { ZorroNotificationServiceTsService } from '../shared/zorro-notification.service';
import { DrillStatistic } from '../models/interfaces/drill-stats.interface';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { DrillType } from '../models/enums/drill-type.enum';
import { DrillSubmissionRequest, DrillSubmissionResponse } from '../models/interfaces/drill-submission.interface';
import { ErrorHandlerUtil } from '../core/utils/error-handler.util';
import { LoadingDelayUtil } from '../core/utils/loading-delay.util';

export interface DrillSubmissionValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DrillSubmissionService {
    private readonly MAX_DRILL_DURATION_SECONDS = 7200; // 2 hours in seconds

    constructor(
        private drillService: DrillService,
        private notificationService: ZorroNotificationServiceTsService,
        private router: Router
    ) {}

    // validates drill submission before sending to backend
    validateDrillSubmission(
        drillStatistic: DrillStatistic,
        drillPreferences: DrillPreference,
        hasBeenInactive: boolean,
        isCompetitive: boolean = false,
        isClassicsMode: boolean = false
    ): DrillSubmissionValidationResult {
        // check if user was afk during the drill (permanent flag) - for all drills except competitive and classics
        if (hasBeenInactive && !isCompetitive && !isClassicsMode) {
            return {
                isValid: false,
                errorMessage: 'Cannot submit drill due to inactivity. Please restart the drill.'
            };
        }

        // check if drill duration is reasonable
        const drillDuration = drillStatistic.duration;

        if (drillDuration > this.MAX_DRILL_DURATION_SECONDS) {
            return {
                isValid: false,
                errorMessage: 'Drill duration exceeds maximum allowed time.'
            };
        }

        // check if real-time data array is not excessively large
        if (drillStatistic.realTimeData.length > this.MAX_DRILL_DURATION_SECONDS) {
            return {
                isValid: false,
                errorMessage: 'Real-time data array is too large. Please restart the drill.'
            };
        }

        // for all drills except competitive and classics, check for suspicious inactivity patterns
        if (!isCompetitive && !isClassicsMode) {
            const totalTypedChars = drillStatistic.correctLetters + drillStatistic.incorrectLetters;
            const charsPerSecond = drillDuration > 0 ? totalTypedChars / drillDuration : 0;

            // if user typed less than 0.1 characters per second on average, it's suspicious
            if (charsPerSecond < 0.1 && drillDuration > 60) {
                return {
                    isValid: false,
                    errorMessage: 'Very low typing activity detected. Please restart the drill.'
                };
            }
        }

        return { isValid: true };
    }

    // submits drill results to backend and handles response
    async submitDrill(
        drillSubmission: DrillSubmissionRequest,
        drillPreferences: DrillPreference,
        hasBeenInactive: boolean,
        isCompetitive: boolean = false,
        isClassicsMode: boolean = false,
        onLoadingChange?: (loading: boolean) => void
    ): Promise<void> {
        // validate submission first
        const validation = this.validateDrillSubmission(drillSubmission.drillStatistic, drillPreferences, hasBeenInactive, isCompetitive, isClassicsMode);
        
        if (!validation.isValid) {
            this.notificationService.createNotification('error', 'AFK Detected', validation.errorMessage!);
            return;
        }

        try {
            // submit with minimum loading time for better UX
            const result: DrillSubmissionResponse = await LoadingDelayUtil.withLoadingState(
                this.drillService.submitDrillResult(drillSubmission),
                (loading: boolean) => onLoadingChange?.(loading),
                800 // 800ms minimum loading time for submissions
            );

            this.notificationService.createNotification('success', 'Drill completed!', 'Your results have been saved successfully.');

            // navigate to drill stats page with the results
            this.router.navigate(['/drill-stats'], {
                state: {
                    drillStats: result,
                    drillPreferences: drillPreferences,
                    currentDrillStats: drillSubmission.drillStatistic
                }
            });

        } catch (error: any) {
            const errorMessage = ErrorHandlerUtil.handleError(error, 'drill');
            this.notificationService.createNotification('error', 'Something went wrong!', errorMessage);
            throw error; // re-throw so component can handle if needed
        }
    }
} 