// === drill-engine.component.ts ===
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrillPreference } from '../../models/interfaces/drill-preference.interface';


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
        NzButtonModule,
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

    // drill settings
    // Remove selectedDifficulty, selectedDuration
    
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
    ) {
        // get drill preference
        let storedPreference: DrillPreference = JSON.parse(localStorage.getItem('drillPreference') ?? '{}');

        // if no preference set, set default preference
        if (Object.keys(storedPreference).length === 0) {
            const defaultPreference: DrillPreference = {
                drillDifficulty: DrillDifficulty.Intermediate,
                drillLength: DrillLength.Medium,
                drillDuration: 30
            };

            localStorage.setItem('drillPreference', JSON.stringify(defaultPreference));

            storedPreference = defaultPreference;
        }

        this.drillPreferences = storedPreference;
    }

    ngOnInit(): void {
        this.showPostDrillOverlay = false;
        this.startDrill();
        this.themeService.getDarkMode().subscribe(isDark => {
            this.isDarkMode = isDark;
        });
    }

    startDrill(): void {
        this.showPostDrillOverlay = false;
        this.isDrillActive = true;

        this.drillStats = {
            wpm: 0,
            accuracy: 0,
            errorMap: {
                wordErrorMap: {},
                charErrorMap: {},
            },
            corrections: 0,
        };

        const words = this.drillTextService.getRandomDrillText(
            this.drillPreferences.drillDifficulty,
            this.drillPreferences.drillLength,
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
    }

    stopDrill(): void {
        // stop timer
        this.isDrillActive = false;
        this.stopTimer();
        // update WPM & accuracy in drill stats
        this.drillStats.wpm = this.wpm;
        this.drillStats.accuracy = this.accuracy;
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
        this.endTime = this.startTime + this.totalTimeInSeconds * 1000;

        this.timerInterval = setInterval(() => {
            const msLeft = this.endTime - Date.now();
            const secondsLeft = Math.max(0, Math.floor(msLeft / 1000));
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;

            this.remainingTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
            this.updateWPMAndAccuracy();

            if (msLeft <= 0) {
                this.stopDrill(); // auto-submit or end
            }
        }, 1000);
    }

    stopTimer(): void {
        clearInterval(this.timerInterval);
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
        this.stopDrill();
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
        };
        this.wpm = 0;
        this.accuracy = 100;
        this.startTime = 0;
        this.remainingTime = '01:00';
    }

    onDrillPreferenceChange(preference: DrillPreference): void {
        this.drillPreferences = preference;
        localStorage.setItem('drillPreference', JSON.stringify(preference));
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
        // TODO: Integrate backend submission here
        this.showPostDrillOverlay = false;
    }
}
