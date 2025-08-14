import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrillType } from '../models/enums/drill-type.enum';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { DrillStatistic } from '../models/interfaces/drill-stats.interface';
import { DrillStatisticsService } from './drill-statistics.service';
import { DrillTextService } from './drill-text.service';
import { AdaptiveService } from './adaptive.service';
import { TimerManagementService } from './timer-management.service';

export interface DrillState {
    isDrillActive: boolean;
    sourceText: string[][];
    wordLocked: boolean[];
    typedText: (any | undefined)[][];
    currentWordIndex: number;
    currentCharIndex: number;
    drillStatistic: DrillStatistic;
    isInputFocused: boolean;
    currentInput: string;
    isTyping: boolean;
    showPostDrillOverlay: boolean;
    isSubmitting: boolean;
    submitError: string;
}

@Injectable({
    providedIn: 'root'
})
export class DrillStateManagementService {
    private drillState$ = new BehaviorSubject<DrillState>({
        isDrillActive: false,
        sourceText: [],
        wordLocked: [],
        typedText: [],
        currentWordIndex: 0,
        currentCharIndex: 0,
        drillStatistic: {} as DrillStatistic,
        isInputFocused: true,
        currentInput: '',
        isTyping: false,
        showPostDrillOverlay: false,
        isSubmitting: false,
        submitError: ''
    });

    constructor(
        private drillStatisticsService: DrillStatisticsService,
        private drillTextService: DrillTextService,
        private adaptiveService: AdaptiveService,
        private timerManagementService: TimerManagementService
    ) {
        // Initialize drill statistic
        this.updateDrillState({
            drillStatistic: this.drillStatisticsService.resetDrillStats()
        });
    }

    /**
     * Get drill state as observable
     */
    getDrillState(): Observable<DrillState> {
        return this.drillState$.asObservable();
    }

    /**
     * Get current drill state
     */
    getCurrentDrillState(): DrillState {
        return this.drillState$.value;
    }

    /**
     * Update drill state
     */
    private updateDrillState(updates: Partial<DrillState>): void {
        this.drillState$.next({
            ...this.drillState$.value,
            ...updates
        });
    }

    /**
     * Start drill with optional adaptive words or book content
     */
    startDrill(adaptiveWords: string[] = [], drillPreferences: DrillPreference, bookContent?: string): void {
        this.updateDrillState({
            showPostDrillOverlay: false,
            isDrillActive: true
        });

        let sourceText: string[][] = [];
        let typedText: (any | undefined)[][] = [];
        let wordLocked: boolean[] = [];

        if (bookContent) {
            // Pre-process book content to normalize all newline characters
            let normalizedContent = bookContent
                .replace(/\r\n/g, '↵')  // Windows line endings
                .replace(/\r/g, '↵')    // Mac line endings (old)
                .replace(/\n/g, '↵')    // Unix line endings
                .replace(/↵↵/g, '↵');   // Normalize multiple consecutive line breaks to single
            
            // Handle book content with normalized line breaks
            const lines = normalizedContent.split('↵');
            
            lines.forEach((line, lineIndex) => {
                if (line.trim() === '') {
                    // Empty line - add a space to maintain line breaks
                    sourceText.push([' ']);
                    typedText.push([undefined]);
                    wordLocked.push(false);
                    return;
                }

                const words = line.trim().split(' ');
                words.forEach((word, wordIndex) => {
                    // Filter out punctuation and keep only alphanumeric characters
                    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                    
                    // Skip empty words after cleaning
                    if (cleanWord.length === 0) {
                        return;
                    }
                    
                    const chars = cleanWord.split('');
                    // Add space after each word except the last word in the line
                    // if (wordIndex < words.length - 1) {
                    //     chars.push(' ');
                    // }

                    chars.push(' ');

                    
                    sourceText.push(chars);
                    typedText.push(new Array(chars.length).fill(undefined));
                    wordLocked.push(false);
                });

                // Add line break after each line (except the last line)
                // This ensures the next word starts on a new line in the drill interface
                if (lineIndex < lines.length - 1) {
                    // Add a special line break token that will force a new line
                    // We use the normalized '↵' character that the drill text component can interpret
                    sourceText.push(['↵']);
                    typedText.push([undefined]);
                    wordLocked.push(false);
                }
            });
        } else {
            // Handle regular drill words
            let words: string[] = [];

            // for timed drills, always use extended length to ensure enough text
            const drillLength = drillPreferences.drillType === DrillType.Timed
                ? 'Extended' as any
                : drillPreferences.drillLength;

            if (drillPreferences.drillType === DrillType.Adaptive) {
                words = adaptiveWords;
            } else {
                words = this.drillTextService.getRandomDrillText(
                    drillPreferences.drillDifficulty,
                    drillLength,
                );
            }

            // add space for every word except last
            sourceText = words.map((word, i) => {
                const chars = word.split('');
                return i < words.length - 1 ? [...chars, ' '] : chars;
            });

            // create undefined 2d array with same source text structure
            typedText = sourceText.map((word) =>
                new Array(word.length).fill(undefined),
            );

            wordLocked = sourceText.map(() => false);
        }

        this.updateDrillState({
            sourceText,
            typedText,
            wordLocked,
            currentWordIndex: 0,
            currentCharIndex: 0,
            drillStatistic: this.drillStatisticsService.resetDrillStats()
        });

        this.adaptiveService.hideAdaptiveDrillOverlay();
    }

    /**
     * Start drill using a provided list of words (authoritative server text)
     */
    startDrillWithProvidedWords(words: string[]): void {
        this.updateDrillState({
            showPostDrillOverlay: false,
            isDrillActive: true
        });

        const sourceText = words.map((word, i) => {
            const chars = word.split('');
            return i < words.length - 1 ? [...chars, ' '] : chars;
        });

        const typedText = sourceText.map((word) => new Array(word.length).fill(undefined));
        const wordLocked = sourceText.map(() => false);

        this.updateDrillState({
            sourceText,
            typedText,
            wordLocked,
            currentWordIndex: 0,
            currentCharIndex: 0,
            drillStatistic: this.drillStatisticsService.resetDrillStats()
        });

        this.adaptiveService.hideAdaptiveDrillOverlay();
    }

    /**
     * Stop drill
     */
    stopDrill(isAdaptive: boolean = false): void {
        this.updateDrillState({
            isDrillActive: false,
            showPostDrillOverlay: !isAdaptive
        });

        this.timerManagementService.stopTimer();
        this.adaptiveService.resetAdaptiveState();
    }

    /**
     * Reset drill stats
     */
    resetDrillStats(drillPreferences: DrillPreference): void {
        this.updateDrillState({
            drillStatistic: this.drillStatisticsService.resetDrillStats(),
            currentWordIndex: 0,
            currentCharIndex: 0,
            currentInput: '',
            isDrillActive: false,
            showPostDrillOverlay: false
        });

        this.timerManagementService.resetTimer(drillPreferences);
        this.adaptiveService.resetAdaptiveState();
    }

    /**
     * Fill random drill text
     */
    fillRandomDrillText(drillPreferences: DrillPreference): void {
        const words = this.drillTextService.getRandomDrillText(
            drillPreferences.drillDifficulty,
            drillPreferences.drillLength,
        );

        const sourceText = words.map((word, i) => {
            const chars = word.split('');
            return i < words.length - 1 ? [...chars, ' '] : chars;
        });

        const typedText = sourceText.map((word) =>
            new Array(word.length).fill(undefined),
        );

        const wordLocked = sourceText.map(() => false);

        this.updateDrillState({
            sourceText,
            typedText,
            wordLocked,
            currentWordIndex: 0,
            currentCharIndex: 0
        });
    }



    /**
     * Set typing state
     */
    setTypingState(isTyping: boolean): void {
        this.updateDrillState({ isTyping });
    }

    /**
     * Set input focus state
     */
    setInputFocusState(isFocused: boolean): void {
        this.updateDrillState({ isInputFocused: isFocused });
    }

    /**
     * Set current input
     */
    setCurrentInput(input: string): void {
        this.updateDrillState({ currentInput: input });
    }

    /**
     * Set submission state
     */
    setSubmissionState(isSubmitting: boolean, error: string = ''): void {
        this.updateDrillState({
            isSubmitting,
            submitError: error
        });
    }

    /**
     * Update drill statistic
     */
    updateDrillStatistic(drillStatistic: DrillStatistic): void {
        this.updateDrillState({ drillStatistic });
    }

    /**
     * Update word and character indices
     */
    updateIndices(currentWordIndex: number, currentCharIndex: number): void {
        this.updateDrillState({
            currentWordIndex,
            currentCharIndex
        });
    }

    /**
     * Update typed text
     */
    updateTypedText(typedText: (any | undefined)[][]): void {
        this.updateDrillState({ typedText });
    }

    /**
     * Update word locked state
     */
    updateWordLocked(wordLocked: boolean[]): void {
        this.updateDrillState({ wordLocked });
    }

    /**
     * Hide post drill overlay
     */
    hidePostDrillOverlay(): void {
        this.updateDrillState({ showPostDrillOverlay: false });
    }

    /**
     * Restart drill with existing words
     */
    restartDrill(): void {
        const currentState = this.getCurrentDrillState();
        
        // Reset only the progress-related state, keep the words
        this.updateDrillState({
            currentWordIndex: 0,
            currentCharIndex: 0,
            isDrillActive: true,
            showPostDrillOverlay: false,
            drillStatistic: this.drillStatisticsService.resetDrillStats(),
            // Reset typed text to all undefined
            typedText: currentState.sourceText.map((word) =>
                new Array(word.length).fill(undefined)
            ),
            // Reset word locked state
            wordLocked: currentState.sourceText.map(() => false)
        });
    }
} 