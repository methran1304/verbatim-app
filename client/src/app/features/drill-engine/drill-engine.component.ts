// === drill-engine.component.ts ===
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrillTextComponent } from './drill-text/drill-text.component';
import { DrillInputComponent } from './drill-input/drill-input.component';
import { DrillTextService } from '../../services/drill-text.service';
import { KeyStroke } from '../../models/interfaces/typed-char.interface';
import { SpecialKeys } from '../../core/constants/keys.constant';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../models/enums/drill-length.enum';
import { DrillStats } from '../../models/interfaces/drill-stats.interface';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { DrillToolbarComponent } from './drill-toolbar/drill-toolbar.component';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../navigation/navigation.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrillPreference } from '../../models/interfaces/drill-preference.interface';
import { DrillType } from '../../models/enums/drill-type.enum';


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
    drillStats!: DrillStats;

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

    constructor(
        private drillTextService: DrillTextService,
        private ngZone: NgZone,
        private themeService: ThemeService,
        private navigationService: NavigationService,
        private route: ActivatedRoute,
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
        
        // get drill type from URL query parameters
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
                // if no drill type in URL, start with current drill type from preferences
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
        this.drillStats = {
            wpm: 0,
            accuracy: 0,
            errorMap: {
                wordErrorMap: {},
                charErrorMap: {},
            },
            corrections: 0,
            wordsCount: 0,
            lettersCount: 0,
            correctWords: 0,
            correctLetters: 0,
            incorrectWords: 0,
            incorrectLetters: 0,
            duration: 0,
        };
    }

    stopDrill(): void {
        // stop timer
        this.isDrillActive = false;
        this.stopTimer();

        // update WPM & accuracy in drill stats
        this.drillStats.wpm = this.wpm;
        this.drillStats.accuracy = this.accuracy;
        
        // wordsCount equals the sum of correct and incorrect words
        this.drillStats.wordsCount = this.drillStats.correctWords + this.drillStats.incorrectWords;
        // lettersCount equals the sum of correct and incorrect letters
        this.drillStats.lettersCount = this.drillStats.correctLetters + this.drillStats.incorrectLetters;
        this.showPostDrillOverlay = true;

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
            this.drillStats.corrections++;
            this.handleBackspace();
            return;
        }

        // set typing state for toolbar animation
        this.setTypingState(true);

        // start timer on first keystroke
        if (!this.startTime) this.startTimer();

        const currentWord = this.sourceText[this.currentWordIndex];

        const expectedChar = currentWord[this.currentCharIndex];
        const enteredChar = value;

        const isCharCorrect = expectedChar === enteredChar;

        if (isCharCorrect) {
            this.drillStats.correctLetters++;
        } else {
            this.drillStats.incorrectLetters++;
        }

        // build char error map
        if (!isCharCorrect) {
            this.drillStats.errorMap.charErrorMap[expectedChar] ??= 0;
            this.drillStats.errorMap.charErrorMap[expectedChar]++;
        }

        if (this.currentCharIndex >= currentWord.length) return;

        // construct typedText array for input to drillText component
        this.typedText[this.currentWordIndex][this.currentCharIndex] = {
            key: value,
            correct: isCharCorrect,
        };

        this.currentCharIndex++;

        // word complete
        if (this.currentCharIndex === currentWord.length) {
            console.log(this.drillStats);
            const isWordCorrect = this.typedText[this.currentWordIndex].every(
                (stroke, i) =>
                    stroke?.key === this.sourceText[this.currentWordIndex][i],
            );

            // build word error map
            if (!isWordCorrect) {
                const currentWordTrimmed = currentWord.join('').trim();
                this.drillStats.errorMap.wordErrorMap[currentWordTrimmed] ??= 0;
                this.drillStats.errorMap.wordErrorMap[currentWordTrimmed]++;
                this.drillStats.incorrectWords++;
            } else {
                this.drillStats.correctWords++;
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

        this.currentCharIndex--;
        this.typedText[this.currentWordIndex][this.currentCharIndex] =
            undefined;
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
        this.drillStats.startTime = this.startTime;
        
        // only set end time for timed drills
        if (this.drillPreferences.drillType === DrillType.Timed) {
            this.endTime = this.startTime + this.totalTimeInSeconds * 1000;
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

                if (msLeft <= 0) {
                    this.stopDrill(); // auto-submit or end
                }
            } else {
                // non-timed drill logic - just track elapsed time for WPM
                const elapsedMs = Date.now() - this.startTime;
                const elapsedSeconds = Math.floor(elapsedMs / 1000);
                const minutes = Math.floor(elapsedSeconds / 60);
                const seconds = elapsedSeconds % 60;

                this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
                this.remainingSeconds = elapsedSeconds;
                this.updateWPMAndAccuracy();
            }
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.timerInterval);
        if (this.drillStats) {
            this.drillStats.endTime = Date.now();
            if (this.drillStats.startTime !== undefined) {
                this.drillStats.duration = (this.drillStats.endTime - this.drillStats.startTime) / 1000;
            } else {
                this.drillStats.duration = 0;
            }
        }
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
        this.drillStats = {
            wpm: 0,
            accuracy: 0,
            errorMap: {
                wordErrorMap: {},
                charErrorMap: {},
            },
            corrections: 0,
            wordsCount: 0,
            lettersCount: 0,
            correctWords: 0,
            correctLetters: 0,
            incorrectWords: 0,
            incorrectLetters: 0,
            duration: 0,
        };

        this.wpm = 0;
        this.accuracy = 100;
        this.startTime = 0;
        this.endTime = 0;
        
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
        // TODO: integrate backend submission here
        // example of how to handle API errors when backend is integrated:
        /*
        this.isSubmitting = true;
        this.drillService.submitDrillResult(this.drillStats).subscribe({
            next: (result) => {
                this.notificationService.createNotification('success', 'Drill completed!', 'Your results have been saved successfully.');
                this.showPostDrillOverlay = false;
                this.isSubmitting = false;
            },
            error: (result) => {
                const errorMessage = ErrorHandlerUtil.handleError(result, 'drill');
                this.notificationService.createNotification('error', 'Something went wrong!', errorMessage);
                this.submitError = errorMessage;
                this.isSubmitting = false;
            },
        });
        */
        
        // for now, just close the overlay
        this.showPostDrillOverlay = false;
    }
}
