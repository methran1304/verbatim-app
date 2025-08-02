import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrillType } from '../models/enums/drill-type.enum';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { DrillStatisticsService } from './drill-statistics.service';
import { ZorroNotificationServiceTsService } from '../shared/zorro-notification.service.ts.service';

export interface TimerState {
    isActive: boolean;
    startTime: number;
    endTime: number;
    remainingTime: string;
    remainingSeconds: number;
    totalTimeInSeconds: number;
    elapsedSeconds: number;
}

export interface TimerCallback {
    onTick?: (timerState: TimerState) => void;
    onTimeout?: () => void;
    onMaxDurationReached?: () => void;
}

@Injectable({
    providedIn: 'root'
})
export class TimerManagementService {
    private readonly MAX_DRILL_DURATION_SECONDS = 7200; // 2 hours
    
    private timerInterval: any;
    private timerState$ = new BehaviorSubject<TimerState>({
        isActive: false,
        startTime: 0,
        endTime: 0,
        remainingTime: '00:00',
        remainingSeconds: 0,
        totalTimeInSeconds: 0,
        elapsedSeconds: 0
    });

    constructor(
        private drillStatisticsService: DrillStatisticsService,
        private notificationService: ZorroNotificationServiceTsService
    ) {}

    // get timer state as observable
    getTimerState(): Observable<TimerState> {
        return this.timerState$.asObservable();
    }

    // get current timer state
    getCurrentTimerState(): TimerState {
        return this.timerState$.value;
    }

    // start the timer based on drill preferences
    startTimer(drillPreferences: DrillPreference, callbacks?: TimerCallback): void {
        const startTime = Date.now();
        let endTime = 0;
        let totalTimeInSeconds = 0;

        // Set timer duration from drill preferences for timed drills
        if (drillPreferences.drillType === DrillType.Timed) {
            totalTimeInSeconds = drillPreferences.drillDuration;
            endTime = startTime + totalTimeInSeconds * 1000;
        }

        const initialState: TimerState = {
            isActive: true,
            startTime,
            endTime,
            remainingTime: this.formatTime(totalTimeInSeconds),
            remainingSeconds: totalTimeInSeconds,
            totalTimeInSeconds,
            elapsedSeconds: 0
        };

        this.timerState$.next(initialState);

        this.timerInterval = setInterval(() => {
            const currentState = this.timerState$.value;
            const currentTime = Date.now();

            if (drillPreferences.drillType === DrillType.Timed) {
                // Timed drill logic
                const msLeft = currentState.endTime - currentTime;
                const secondsLeft = Math.max(0, Math.floor(msLeft / 1000));
                const elapsedSeconds = currentState.totalTimeInSeconds - secondsLeft;

                const updatedState: TimerState = {
                    ...currentState,
                    remainingTime: this.formatTime(secondsLeft),
                    remainingSeconds: secondsLeft,
                    elapsedSeconds
                };

                this.timerState$.next(updatedState);

                // Call onTick callback
                if (callbacks?.onTick) {
                    callbacks.onTick(updatedState);
                }

                if (msLeft <= 0) {
                    this.stopTimer();
                    if (callbacks?.onTimeout) {
                        callbacks.onTimeout();
                    }
                }
            } else {
                // Non-timed drill logic - track elapsed time
                const elapsedMs = currentTime - currentState.startTime;
                const elapsedSeconds = Math.floor(elapsedMs / 1000);

                const updatedState: TimerState = {
                    ...currentState,
                    remainingTime: this.formatTime(elapsedSeconds),
                    remainingSeconds: elapsedSeconds,
                    elapsedSeconds
                };

                this.timerState$.next(updatedState);

                // Call onTick callback
                if (callbacks?.onTick) {
                    callbacks.onTick(updatedState);
                }

                // Check for maximum drill duration
                if (elapsedSeconds >= this.MAX_DRILL_DURATION_SECONDS) {
                    this.notificationService.createNotification('warning', 'Drill Timeout', 'Maximum drill duration reached. Your progress will be saved.');
                    this.stopTimer();
                    if (callbacks?.onMaxDurationReached) {
                        callbacks.onMaxDurationReached();
                    }
                }
            }
        }, 1000);
    }

    // stop the timer
    stopTimer(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        const currentState = this.timerState$.value;
        this.timerState$.next({
            ...currentState,
            isActive: false
        });
    }

    // reset the timer to initial state
    resetTimer(drillPreferences: DrillPreference): void {
        this.stopTimer();

        let totalTimeInSeconds = 0;
        if (drillPreferences.drillType === DrillType.Timed) {
            totalTimeInSeconds = drillPreferences.drillDuration;
        }

        const resetState: TimerState = {
            isActive: false,
            startTime: 0,
            endTime: 0,
            remainingTime: this.formatTime(totalTimeInSeconds),
            remainingSeconds: totalTimeInSeconds,
            totalTimeInSeconds,
            elapsedSeconds: 0
        };

        this.timerState$.next(resetState);
    }

    // get the duration of the completed drill in seconds
    getDrillDuration(): number {
        const currentState = this.timerState$.value;
        if (currentState.startTime > 0) {
            return Math.floor((Date.now() - currentState.startTime) / 1000);
        }
        return 0;
    }

    // check if timer is currently active
    isTimerActive(): boolean {
        return this.timerState$.value.isActive;
    }

    // format time in MM:SS format
    private formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${this.drillStatisticsService.pad(minutes)}:${this.drillStatisticsService.pad(remainingSeconds)}`;
    }
} 