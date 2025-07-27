// === drill-engine.component.ts ===
import { Component, NgZone, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrillTextComponent } from './drill-text/drill-text.component';
import { DrillInputComponent } from './drill-input/drill-input.component';
import { DrillTextService } from '../../services/drill-text.service';
import { KeyStroke } from '../../models/interfaces/typed-char.interface';
import { SpecialKeys } from '../../core/constants/keys.constant';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../models/enums/drill-length.enum';
import { DrillStatistic, PointTimeData } from '../../models/interfaces/drill-stats.interface';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { DrillToolbarComponent } from './drill-toolbar/drill-toolbar.component';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../navigation/navigation.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrillPreference } from '../../models/interfaces/drill-preference.interface';
import { DrillType } from '../../models/enums/drill-type.enum';
import { ZorroNotificationServiceTsService } from '../../shared/zorro-notification.service.ts.service';
import { ErrorHandlerUtil } from '../../core/utils/error-handler.util';
import { DrillService } from '../../services/drill.service';
import { DrillSubmissionRequest, DrillSubmissionResponse } from '../../models/interfaces/drill-submission.interface';


@Component({
    selector: 'app-drill-engine',
    standalone: true,
    imports: [
        CommonModule,
        DrillTextComponent,
        DrillInputComponent,
        VirtualKeyboardComponent,
        DrillToolbarComponent,
        NzCardModule,
        NzButtonModule
    ],
    providers: [],
    templateUrl: './drill-engine.component.html',
    styleUrl: './drill-engine.component.scss',
})
export class DrillEngineComponent implements OnInit {
    @ViewChild(DrillInputComponent) drillInputComponent!: DrillInputComponent;

    isDrillActive: boolean = false;
    sourceText: string[][] = [];
    wordLocked: boolean[] = [];
    typedText: (KeyStroke | undefined)[][] = [];
    currentWordIndex: number = 0;
    currentCharIndex: number = 0;

    startTime: number = 0;
    totalTimeInSeconds: number = 10;
    remainingTime: string = '01:00';
    remainingSeconds: number = 60;
    private endTime: number = 0;
    timerInterval!: any;

    wpm: number = 0;
    accuracy: number = 100;
    drillStatistic!: DrillStatistic;

    // Time series data collection
    realTimeData: PointTimeData[] = [];
    private lastDataPointTime: number = 0;
    private wordsCompletedThisSecond: number[] = [];
    private wordsIncorrectThisSecond: number[] = [];
    private correctionsThisSecond: number = 0;

    isInputFocused: boolean = true;
    currentInput: string = '';

    isDarkMode: boolean = false;
    
    // drill preference
    drillPreferences: DrillPreference;

    // drill type from navigation
    currentDrillType: DrillType = DrillType.Timed;

    // typing state for toolbar animation
    isTyping: boolean = false;
    private typingTimeout: any;

    showPostDrillOverlay: boolean = false;
    isSubmitting: boolean = false;
    submitError: string = '';

    // afk protection and inactivity detection
    private lastActivityTime: number = 0;
    public isUserInactive: boolean = false;
    public hasBeenInactive: boolean = false;
    private inactivityTimeout: any;
    private readonly MAX_INACTIVITY_SECONDS = 10;
    private readonly MAX_DRILL_DURATION_SECONDS = 7200;
    private readonly INACTIVITY_CHECK_INTERVAL = 10000;
    private inactivityCheckInterval: any;
    public afkReason: string = '';

    constructor(
        private drillTextService: DrillTextService,
        private drillService: DrillService,
        private ngZone: NgZone,
        private themeService: ThemeService,
        private navigationService: NavigationService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: ZorroNotificationServiceTsService
    ) {
        // get drill preference
        let storedPreference: DrillPreference = JSON.parse(localStorage.getItem('drillPreference') ?? '{}');

        // if no preference set, set default preference
        if (Object.keys(storedPreference).length === 0) {
            const defaultPreference: DrillPreference = {
                drillType: DrillType.Timed,
                drillDifficulty: DrillDifficulty.Intermediate,
                drillLength: DrillLength.Medium,
                drillDuration: 30
            };

            localStorage.setItem('drillPreference', JSON.stringify(defaultPreference));

            storedPreference = defaultPreference;
        }

        this.drillPreferences = storedPreference;
        
        // initialize current drill type from stored preferences
        this.currentDrillType = this.drillPreferences.drillType || DrillType.Timed;
    }

    ngOnInit(): void {
        // set initial drill type from preferences
        this.navigationService.setCurrentDrillType(this.currentDrillType);
        
        // initialize timer with current preferences
        this.resetDrillStats();
        
        // get drill type from url query parameters
        this.route.queryParams.subscribe(params => {
            const drillType = params['type'];
            if (drillType && Object.values(DrillType).includes(drillType)) {
                this.currentDrillType = drillType as DrillType;
                this.navigationService.setCurrentDrillType(this.currentDrillType);
                
                // update drill preferences with new drill type and save to localStorage
                this.drillPreferences.drillType = this.currentDrillType;
                localStorage.setItem('drillPreference', JSON.stringify(this.drillPreferences));
                
                this.onNewDrill();
            } else if (!drillType) {
                // if no drill type in url, start with current drill type from preferences
                this.onNewDrill();
            }
        });

        this.themeService.getDarkMode().subscribe(isDark => {
            this.isDarkMode = isDark;
        });
    }

    startDrill(): void {
        this.showPostDrillOverlay = false;
        this.isDrillActive = true;

        // set timer duration from drill preferences for timed drills
        if (this.drillPreferences.drillType === DrillType.Timed) {
            this.totalTimeInSeconds = this.drillPreferences.drillDuration;
            this.remainingSeconds = this.totalTimeInSeconds;
            const minutes = Math.floor(this.totalTimeInSeconds / 60);
            const seconds = this.totalTimeInSeconds % 60;
            this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
        }

        // for timed drills, always use marathon length to ensure enough text
        const drillLength = this.drillPreferences.drillType === DrillType.Timed 
            ? DrillLength.Marathon 
            : this.drillPreferences.drillLength;

        const words = this.drillTextService.getRandomDrillText(
            this.drillPreferences.drillDifficulty,
            drillLength,
        );

        // add space for every word except last
        this.sourceText = words.map((word, i) => {
            const chars = word.split('');
            return i < words.length - 1 ? [...chars, ' '] : chars;
        });

        // create undefined 2d array with same source text structure
        this.typedText = this.sourceText.map((word) =>
            new Array(word.length).fill(undefined),
        );

        this.wordLocked = this.sourceText.map(() => false);

        this.currentWordIndex = 0;
        this.currentCharIndex = 0;

        // construct drill stats 
        this.drillStatistic = {
            errorRate: 0,
            wpm: 0,
            accuracy: 0,
            avgWPM: 0,
            avgAccuracy: 0,
            maxWPM: 0,
            maxAccuracy: 0,
            errorMap: {
                wordErrorMap: {},
                charErrorMap: {},
            },
            totalCorrections: 0,
            wordsCount: 0,
            lettersCount: 0,
            correctWords: 0,
            correctLetters: 0,
            incorrectWords: 0,
            incorrectLetters: 0,
            duration: 0,
            realTimeData: [],
        };
    }

    stopDrill(): void {
        // stop timer
        this.isDrillActive = false;
        this.stopTimer();

        // stop inactivity monitoring
        this.stopInactivityMonitoring();

        // add final data point if drill was active
        if (this.startTime > 0) {
            const finalTimePoint = this.drillPreferences.drillType === DrillType.Timed 
                ? this.totalTimeInSeconds 
                : Math.floor((Date.now() - this.startTime) / 1000);
            this.addTimeSeriesDataPoint(finalTimePoint);
        }

        this.drillStatistic.realTimeData = [...this.realTimeData];
        
        // update wpm & accuracy in drill stats
        this.drillStatistic.wpm = this.wpm;
        this.drillStatistic.accuracy = this.accuracy;

        this.drillStatistic.avgWPM = this.drillStatistic.realTimeData.length > 0 
            ? this.drillStatistic.realTimeData.reduce((acc, curr) => acc + curr.wpm, 0) / this.drillStatistic.realTimeData.length
            : 0;

        this.drillStatistic.avgAccuracy = this.drillStatistic.realTimeData.length > 0
            ? this.drillStatistic.realTimeData.reduce((acc, curr) => acc + curr.accuracy, 0) / this.drillStatistic.realTimeData.length
            : 100;

        this.drillStatistic.maxWPM = this.drillStatistic.realTimeData.reduce((acc, curr) => Math.max(acc, curr.wpm), 0);
        this.drillStatistic.maxAccuracy = this.drillStatistic.realTimeData.reduce((acc, curr) => Math.max(acc, curr.accuracy), 0);
        
        // wordscount equals the sum of correct and incorrect words
        this.drillStatistic.wordsCount = this.drillStatistic.correctWords + this.drillStatistic.incorrectWords;
        // letterscount equals the sum of all letters in the source text
        this.drillStatistic.lettersCount = this.drillStatistic.correctLetters + this.drillStatistic.incorrectLetters;

        // calculate error rate for this drill
        this.drillStatistic.errorRate = this.drillStatistic.wordsCount > 0 
            ? (this.drillStatistic.incorrectWords / this.drillStatistic.wordsCount) * 100 
            : 0;

        this.showPostDrillOverlay = true;

        console.log(this.drillStatistic);
    }

    resumeDrill(): void {
        this.focusInput(); // refocus the hidden input
    }

    onKeyTyped(value: string): void {
        if (value === 'CTRL_BACKSPACE') {
            this.clearCurrentWord();
            return;
        } else if (value === 'ESCAPE') {
            this.drillInputComponent.blurInput();
            return;
        }

        if (value === SpecialKeys.Backspace.toString()) {
            this.handleBackspace();
            return;
        }

        // track user activity
        this.updateUserActivity();

        // set typing state for toolbar animation
        this.setTypingState(true);

        // start timer on first keystroke
        if (!this.startTime) this.startTimer();

        const currentWord = this.sourceText[this.currentWordIndex];

        const expectedChar = currentWord[this.currentCharIndex];
        const enteredChar = value;

        const isCharCorrect = expectedChar === enteredChar;

        if (isCharCorrect) {
            this.drillStatistic.correctLetters++;
        } else {
            this.drillStatistic.incorrectLetters++;
        }

        // build char error map
        if (!isCharCorrect) {
            this.drillStatistic.errorMap.charErrorMap[expectedChar] ??= 0;
            this.drillStatistic.errorMap.charErrorMap[expectedChar]++;
        }

        if (this.currentCharIndex >= currentWord.length) return;

        // construct typedtext array for input to drilltext component
        this.typedText[this.currentWordIndex][this.currentCharIndex] = {
            key: value,
            correct: isCharCorrect,
        };

        this.currentCharIndex++;

        // word complete
        if (this.currentCharIndex === currentWord.length) {
            const isWordCorrect = this.typedText[this.currentWordIndex].every(
                (stroke, i) =>
                    stroke?.key === this.sourceText[this.currentWordIndex][i],
            );

            // build word error map
            if (!isWordCorrect) {
                const currentWordTrimmed = currentWord.join('').trim();
                this.drillStatistic.errorMap.wordErrorMap[currentWordTrimmed] ??= 0;
                this.drillStatistic.errorMap.wordErrorMap[currentWordTrimmed]++;
                this.drillStatistic.incorrectWords++;
                
                // track incorrect word for time series data
                this.wordsIncorrectThisSecond.push(this.currentWordIndex);
            } else {
                this.drillStatistic.correctWords++;
                
                // track completed word for time series data
                this.wordsCompletedThisSecond.push(this.currentWordIndex);
            }

            // do not let user modify the completed correct words
            this.wordLocked[this.currentWordIndex] = isWordCorrect;

            this.drillInputComponent.clearDrillInput();
            this.currentWordIndex++;
            this.currentCharIndex = 0;

            if (this.currentWordIndex >= this.sourceText.length) {
                this.stopDrill();
                return;
            }
        }
    }

    clearCurrentWord(): void {
        // beginning of the word and it's not the first word
        if (this.currentCharIndex === 0 && this.currentWordIndex > 0) {
            const prevIndex = this.currentWordIndex - 1;

            // cannot clear locked word
            if (this.wordLocked[prevIndex]) {
                return;
            }

            const length = this.sourceText[prevIndex].length;
            this.typedText[prevIndex] = new Array(length).fill(undefined);
            this.currentWordIndex = prevIndex;
            this.currentCharIndex = 0;
            this.drillInputComponent.clearDrillInput();
            return;
        }

        if (this.wordLocked[this.currentWordIndex]) return;

        // clear current word if not locked
        const wordLength = this.sourceText[this.currentWordIndex]?.length ?? 0;

        // clear typed state for current word
        this.typedText[this.currentWordIndex] = new Array(wordLength).fill(
            undefined,
        );

        this.currentCharIndex = 0;
        this.drillInputComponent.clearDrillInput();
    }

    handleBackspace(): void {
        if (this.currentCharIndex === 0) {
            if (this.currentWordIndex === 0) return;

            // move to previous word
            const prevIndex = this.currentWordIndex - 1;

            // cannot backtrack to a locked word
            if (this.wordLocked[prevIndex]) return;

            this.currentWordIndex = prevIndex;
            this.currentCharIndex = this.sourceText[prevIndex].length;
        }

        // only increment corrections if we're actually moving the cursor back
        // and there's a character to delete (not at the beginning of the word)
        if (this.currentCharIndex > 0) {
            this.currentCharIndex--;
            this.typedText[this.currentWordIndex][this.currentCharIndex] = undefined;
            this.drillStatistic.totalCorrections++;
            this.correctionsThisSecond++;
        }
    }

    updateWPMAndAccuracy(): void {
        // only count actual typed characters
        const flattened = this.typedText.flat();
        const typedChars = flattened.filter((k) => k !== undefined);
        const correctChars = typedChars.filter((k) => k?.correct).length;

        const elapsedMinutes = (Date.now() - this.startTime) / 60000;

        this.wpm = Math.floor(correctChars / 5 / elapsedMinutes);

        const totalKeystrokes = typedChars.length;
        this.accuracy = totalKeystrokes
            ? Math.floor((correctChars / totalKeystrokes) * 100)
            : 100;
    }

    startTimer(): void {
        this.startTime = Date.now();
        this.lastActivityTime = this.startTime;
        
        // initialize first data point at time 0
        this.lastDataPointTime = 0;
        this.addTimeSeriesDataPoint(0);
        
        // only set end time for timed drills
        if (this.drillPreferences.drillType === DrillType.Timed) {
            this.endTime = this.startTime + this.totalTimeInSeconds * 1000;
        }

        // start inactivity monitoring for non-timed drills
        if (this.drillPreferences.drillType !== DrillType.Timed) {
            this.startInactivityMonitoring();
        }

        this.timerInterval = setInterval(() => {
            if (this.drillPreferences.drillType === DrillType.Timed) {
                // timed drill logic
                const msLeft = this.endTime - Date.now();
                const secondsLeft = Math.max(0, Math.floor(msLeft / 1000));
                const minutes = Math.floor(secondsLeft / 60);
                const seconds = secondsLeft % 60;

                this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
                this.remainingSeconds = secondsLeft;
                this.updateWPMAndAccuracy();
                
                const currentTimePoint = this.totalTimeInSeconds - secondsLeft;
                this.addTimeSeriesDataPoint(currentTimePoint);

                if (msLeft <= 0) {
                    this.stopDrill();
                }
            } else {
                // non-timed drill logic - just track elapsed time for wpm
                const elapsedMs = Date.now() - this.startTime;
                const elapsedSeconds = Math.floor(elapsedMs / 1000);
                const minutes = Math.floor(elapsedSeconds / 60);
                const seconds = elapsedSeconds % 60;

                this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
                this.remainingSeconds = elapsedSeconds;
                this.updateWPMAndAccuracy();
                
                // only add data points if user is active or within reasonable inactivity period
                if (!this.isUserInactive || elapsedSeconds <= this.MAX_INACTIVITY_SECONDS) {
                    this.addTimeSeriesDataPoint(elapsedSeconds);
                }

                // check for maximum drill duration
                if (elapsedSeconds >= this.MAX_DRILL_DURATION_SECONDS) {
                    this.notificationService.createNotification('warning', 'Drill Timeout', 'Maximum drill duration reached. Your progress will be saved.');
                    this.stopDrill();
                }
            }
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.timerInterval);
        if (this.drillStatistic && this.startTime) {
            this.drillStatistic.duration = Math.floor((Date.now() - this.startTime) / 1000);
        }
    }

    private addTimeSeriesDataPoint(timePoint: number): void {
        const expectedTimePoints = Array.from({length: timePoint + 1}, (_, i) => i);
        
        for (const expectedTimePoint of expectedTimePoints) {
            // check if we already have this time point
            const existingIndex = this.realTimeData.findIndex(dp => dp.timePoint === expectedTimePoint);
            
            if (existingIndex === -1) {
                // add missing time point
                const dataPoint: PointTimeData = {
                    timePoint: expectedTimePoint,
                    wpm: this.wpm,
                    accuracy: this.accuracy,
                    corrections: this.correctionsThisSecond,
                    incorrectWords: [...this.wordsIncorrectThisSecond],
                    correctWords: [...this.wordsCompletedThisSecond]
                };
                
                this.realTimeData.push(dataPoint);
            } else if (expectedTimePoint === timePoint) {
                // update current time point with latest data
                this.realTimeData[existingIndex] = {
                    timePoint: expectedTimePoint,
                    wpm: this.wpm,
                    accuracy: this.accuracy,
                    corrections: this.correctionsThisSecond,
                    incorrectWords: [...this.wordsIncorrectThisSecond],
                    correctWords: [...this.wordsCompletedThisSecond]
                };
            }
        }
        
        // update last data point time
        this.lastDataPointTime = Math.max(this.lastDataPointTime, timePoint);
        
        // reset the per-second tracking arrays
        this.wordsCompletedThisSecond = [];
        this.wordsIncorrectThisSecond = [];
        this.correctionsThisSecond = 0;
    }

    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }

    focusInput() {
        this.drillInputComponent?.focusInput();
    }

    onInputFocus(): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.isInputFocused = true;
                });
            });
        });
    }

    onInputBlur(): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.isInputFocused = false;
                });
            });
        });
    }

    handleVirtualKeyPress = (button: string) => {
        this.onKeyTyped(button);
        this.currentInput += button;
    };

    // toolbar event handlers
    onRestart(): void {
        this.stopDrill();
        this.resetDrillStats();
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.typedText = this.sourceText.map((word) =>
            new Array(word.length).fill(undefined),
        );
        this.wordLocked = this.sourceText.map(() => false);
        this.isDrillActive = true;
        this.showPostDrillOverlay = false;
        this.focusInput();
    }

    onNewDrill(): void {
        // reset all stats and state completely
        this.resetDrillStats();
        this.isDrillActive = false;
        this.showPostDrillOverlay = false;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.currentInput = '';
        this.isInputFocused = true;
        
        // stop any existing timer
        this.stopTimer();
        
        // start fresh drill
        this.startDrill();
        this.focusInput();
    }

    private resetDrillStats(): void {
        this.drillStatistic = {
            errorRate: 0,
            wpm: 0,
            accuracy: 0,
            avgWPM: 0,
            avgAccuracy: 0,
            maxWPM: 0,
            maxAccuracy: 0,
            errorMap: {
                wordErrorMap: {},
                charErrorMap: {},
            },
            totalCorrections: 0,
            wordsCount: 0,
            lettersCount: 0,
            correctWords: 0,
            correctLetters: 0,
            incorrectWords: 0,
            incorrectLetters: 0,
            duration: 0,
            realTimeData: [],
        };

        this.wpm = 0;
        this.accuracy = 100;
        this.startTime = 0;
        this.endTime = 0;
        
        // reset time series data
        this.realTimeData = [];
        this.lastDataPointTime = 0;
        this.wordsCompletedThisSecond = [];
        this.wordsIncorrectThisSecond = [];
        this.correctionsThisSecond = 0;
        
        // reset inactivity tracking
        this.lastActivityTime = 0;
        this.isUserInactive = false;
        this.hasBeenInactive = false;
        this.afkReason = '';
        this.stopInactivityMonitoring();
        
        // set timer duration from drill preferences for timed drills
        if (this.drillPreferences.drillType === DrillType.Timed) {
            this.totalTimeInSeconds = this.drillPreferences.drillDuration;
            this.remainingSeconds = this.totalTimeInSeconds;
            const minutes = Math.floor(this.totalTimeInSeconds / 60);
            const seconds = this.totalTimeInSeconds % 60;
            this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
        } else {
            this.remainingTime = '01:00';
            this.totalTimeInSeconds = 10;
            this.remainingSeconds = 60;
        }
    }

    onDrillPreferenceChange(preference: DrillPreference): void {
        this.drillPreferences = preference;
        localStorage.setItem('drillPreference', JSON.stringify(preference));
        
        // update current drill type if it changed
        if (preference.drillType !== this.currentDrillType) {
            this.currentDrillType = preference.drillType;
            this.navigationService.setCurrentDrillType(this.currentDrillType);
        }
        
        // always restart drill when preferences change to ensure proper initialization
        if (this.isDrillActive) {
            this.stopDrill();
            this.resetDrillStats();
            this.startDrill();
            this.focusInput();
        }
    }

    private setTypingState(isTyping: boolean): void {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.isTyping = isTyping;

        if (isTyping) {
            // reset typing state after 2 seconds of no typing
            this.typingTimeout = setTimeout(() => {
                this.isTyping = false;
            }, 2000);
        }
    }

    onPostDrillSubmit(): void {
        // reset error state for new submit request
        this.submitError = '';
        this.isSubmitting = true;

        // validate drill submission before sending
        if (!this.validateDrillSubmission()) {
            this.submitError = 'Drill submission validation failed. Please try again.';
            this.isSubmitting = false;
            return;
        }

        // convert source text to array of strings
        const sourceTextArray = this.sourceText.map(word => word.join('').trim());
        
        // convert typed text to array of strings
        const typedWordsArray = this.typedText.map(word => {
            return word.map(char => char?.key?.trim() || '').join('');
        });

        // create drill submission object
        const drillSubmission: DrillSubmissionRequest = {
            drillDifficulty: this.drillPreferences.drillDifficulty,
            drillType: this.drillPreferences.drillType,
            sourceText: sourceTextArray,
            typedWords: typedWordsArray,
            drillStatistic: this.drillStatistic
        };

        this.drillService.submitDrillResult(drillSubmission).subscribe({
            next: (result: DrillSubmissionResponse) => {
                this.notificationService.createNotification('success', 'Drill completed!', 'Your results have been saved successfully.');
                this.showPostDrillOverlay = false;
                this.isSubmitting = false;
                
                // navigate to drill stats page with the results
                this.router.navigate(['/drill-stats'], {
                    state: {
                        drillStats: result,
                        drillPreferences: this.drillPreferences,
                        currentDrillStats: this.drillStatistic
                    }
                });
            },
            error: (error) => {
                const errorMessage = ErrorHandlerUtil.handleError(error, 'drill');
                this.notificationService.createNotification('error', 'Something went wrong!', errorMessage);
                this.submitError = errorMessage;
                this.isSubmitting = false;
            },
        });
    }

    // afk protection and inactivity detection methods
    private updateUserActivity(): void {
        this.lastActivityTime = Date.now();
        
        // if user was inactive and now becomes active, clear the current afk state but keep the permanent flag
        if (this.isUserInactive) {
            this.isUserInactive = false;
            this.notificationService.createNotification('info', 'Activity Resumed', 'You can continue typing, but this drill cannot be submitted due to previous inactivity.');
        }
        
        // clear existing inactivity timeout
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }
        
        // set new inactivity timeout
        this.inactivityTimeout = setTimeout(() => {
            this.isUserInactive = true;
            this.hasBeenInactive = true;
            this.afkReason = 'Inactivity detected, so drill cannot be submitted.';
            this.notificationService.createNotification('error', 'AFK Detected', this.afkReason);
        }, this.MAX_INACTIVITY_SECONDS * 1000);
    }

    private startInactivityMonitoring(): void {
        // check for inactivity every 10 seconds
        this.inactivityCheckInterval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActivity = (currentTime - this.lastActivityTime) / 1000;
            
            if (timeSinceLastActivity >= this.MAX_INACTIVITY_SECONDS && !this.isUserInactive) {
                this.isUserInactive = true;
                this.hasBeenInactive = true;
                this.afkReason = 'Inactivity detected, so drill cannot be submitted.';
                this.notificationService.createNotification('error', 'AFK Detected', this.afkReason);
            }
        }, this.INACTIVITY_CHECK_INTERVAL);
    }

    private stopInactivityMonitoring(): void {
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
            this.inactivityTimeout = null;
        }
        
        if (this.inactivityCheckInterval) {
            clearInterval(this.inactivityCheckInterval);
            this.inactivityCheckInterval = null;
        }
    }

    private validateDrillSubmission(): boolean {
        // check if user was afk during the drill (permanent flag)
        if (this.hasBeenInactive) {
            this.notificationService.createNotification('error', 'AFK Detected', 'Cannot submit drill due to inactivity. Please restart the drill.');
            return false;
        }

        // check if drill duration is reasonable
        const drillDuration = this.drillStatistic.duration;
        
        if (drillDuration > this.MAX_DRILL_DURATION_SECONDS) {
            this.notificationService.createNotification('error', 'Invalid Drill Duration', 'Drill duration exceeds maximum allowed time.');
            return false;
        }

        // check if real-time data array is not excessively large
        if (this.drillStatistic.realTimeData.length > this.MAX_DRILL_DURATION_SECONDS) {
            this.notificationService.createNotification('error', 'Invalid Data', 'Real-time data array is too large. Please restart the drill.');
            return false;
        }

        // for non-timed drills, check for suspicious inactivity patterns
        if (this.drillPreferences.drillType !== DrillType.Timed) {
            const totalTypedChars = this.drillStatistic.correctLetters + this.drillStatistic.incorrectLetters;
            const charsPerSecond = drillDuration > 0 ? totalTypedChars / drillDuration : 0;
            
            // if user typed less than 0.1 characters per second on average, it's suspicious
            if (charsPerSecond < 0.1 && drillDuration > 60) {
                this.notificationService.createNotification('error', 'Suspicious Activity', 'Very low typing activity detected. Please restart the drill.');
                return false;
            }
        }

        return true;
    }

    // host listener for global activity tracking
    @HostListener('document:keydown', ['$event'])
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:touchstart', ['$event'])
    onGlobalActivity(): void {
        if (this.isDrillActive && this.drillPreferences.drillType !== DrillType.Timed) {
            this.updateUserActivity();
        }
    }
}
