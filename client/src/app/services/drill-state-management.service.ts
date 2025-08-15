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
    private drillStateSubject = new BehaviorSubject<DrillState>({
        sourceText: [],
        typedText: [],
        wordLocked: [],
        currentWordIndex: 0,
        currentCharIndex: 0,
        isDrillActive: false,
        showPostDrillOverlay: false,
        drillStatistic: {} as DrillStatistic,
        isInputFocused: true,
        currentInput: '',
        isTyping: false,
        isSubmitting: false,
        submitError: ''
    });

    private drillStatisticSubject = new BehaviorSubject<DrillStatistic>({} as DrillStatistic);

    // store full book content for chunked loading
    private fullBookContent: string = '';
    private readonly CHUNK_SIZE = 500; // words per chunk

    constructor(
        private drillStatisticsService: DrillStatisticsService,
        private drillTextService: DrillTextService,
        private adaptiveService: AdaptiveService,
        private timerManagementService: TimerManagementService
    ) {
        // initialize drill statistic
        this.updateDrillState({
            drillStatistic: this.drillStatisticsService.resetDrillStats()
        });
    }

    /**
     * Get drill state as observable
     */
    getDrillState(): Observable<DrillState> {
        return this.drillStateSubject.asObservable();
    }

    /**
     * Get current drill state
     */
    getCurrentDrillState(): DrillState {
        return this.drillStateSubject.value;
    }

    /**
     * Update drill state
     */
    private updateDrillState(updates: Partial<DrillState>): void {
        this.drillStateSubject.next({
            ...this.drillStateSubject.value,
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
            // store full book content for chunked loading
            this.fullBookContent = bookContent;
            // for large book content, use chunked loading
            sourceText = this.processBookContentInChunks(bookContent);
            typedText = sourceText.map((word) => new Array(word.length).fill(undefined));
            wordLocked = sourceText.map(() => false);
        } else {
            // handle regular drill words
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
        });
    }

    private processBookContentInChunks(bookContent: string): string[][] {
        const MAX_WORDS_PER_CHUNK = this.CHUNK_SIZE; // Adjust based on performance
        const sourceText: string[][] = [];
        
        // pre-process book content to normalize all newline characters
        let normalizedContent = bookContent
            .replace(/\r\n/g, '↵')  // Windows line endings
            .replace(/\r/g, '↵')    // Mac line endings (old)
            .replace(/\n/g, '↵')    // Unix line endings
            .replace(/↵↵/g, '↵');   // Normalize multiple consecutive line breaks to single
        
        // handle book content with normalized line breaks
        const lines = normalizedContent.split('↵');
        let wordCount = 0;
        
        lines.forEach((line, lineIndex) => {
            if (line.trim() === '') {
                // empty line - add a space to maintain line breaks
                sourceText.push([' ']);
                wordCount++;
                return;
            }

            const words = line.trim().split(' ');
            words.forEach((word, wordIndex) => {
                // stop processing if we've reached the chunk limit
                if (wordCount >= MAX_WORDS_PER_CHUNK) {
                    return;
                }
                
                // filter out punctuation and keep only alphanumeric characters
                const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                
                // skip empty words after cleaning
                if (cleanWord.length === 0) {
                    return;
                }
                
                const chars = cleanWord.split('');
                chars.push(' ');

                sourceText.push(chars);
                wordCount++;
            });

            // add line break after each line (except the last line)
            if (lineIndex < lines.length - 1 && wordCount < MAX_WORDS_PER_CHUNK) {
                sourceText.push(['↵']);
                wordCount++;
            }
        });

        return sourceText;
    }

    // method to load next chunk when user reaches end of current chunk
    loadNextChunk(bookContent: string, currentWordIndex: number): string[][] {
        const MAX_WORDS_PER_CHUNK = 500;
        const sourceText: string[][] = [];
        
        // pre-process book content
        let normalizedContent = bookContent
            .replace(/\r\n/g, '↵')
            .replace(/\r/g, '↵')
            .replace(/\n/g, '↵')
            .replace(/↵↵/g, '↵');
        
        const lines = normalizedContent.split('↵');
        let wordCount = 0;
        let processedWords = 0;
        
        lines.forEach((line, lineIndex) => {
            if (line.trim() === '') {
                if (processedWords >= currentWordIndex) {
                    sourceText.push([' ']);
                    wordCount++;
                }
                processedWords++;
                return;
            }

            const words = line.trim().split(' ');
            words.forEach((word, wordIndex) => {
                if (processedWords >= currentWordIndex && wordCount < MAX_WORDS_PER_CHUNK) {
                    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                    
                    if (cleanWord.length > 0) {
                        const chars = cleanWord.split('');
                        chars.push(' ');
                        sourceText.push(chars);
                        wordCount++;
                    }
                }
                processedWords++;
            });

            if (lineIndex < lines.length - 1 && processedWords >= currentWordIndex && wordCount < MAX_WORDS_PER_CHUNK) {
                sourceText.push(['↵']);
                wordCount++;
            }
        });

        return sourceText;
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
        
        // reset only the progress-related state, keep the words
        this.updateDrillState({
            currentWordIndex: 0,
            currentCharIndex: 0,
            isDrillActive: true,
            showPostDrillOverlay: false,
            drillStatistic: this.drillStatisticsService.resetDrillStats(),
            // reset typed text to all undefined
            typedText: currentState.sourceText.map((word) =>
                new Array(word.length).fill(undefined)
            ),
            // reset word locked state
            wordLocked: currentState.sourceText.map(() => false)
        });
    }

            // check if we need to load the next chunk
    shouldLoadNextChunk(currentWordIndex: number): boolean {
        if (!this.fullBookContent) return false;
        
        const currentState = this.getCurrentDrillState();
        const remainingWords = currentState.sourceText.length - currentWordIndex;
        
        // load next chunk when user is within 50 words of the end
        return remainingWords <= 50;
    }

            // load next chunk and append to current source text
    loadNextChunkIfNeeded(currentWordIndex: number): void {
        if (!this.shouldLoadNextChunk(currentWordIndex) || !this.fullBookContent) {
            return;
        }

        const currentState = this.getCurrentDrillState();
        const nextChunk = this.loadNextChunk(this.fullBookContent, currentWordIndex);
        
        if (nextChunk.length > 0) {
            // append new chunk to existing source text
            const newSourceText = [...currentState.sourceText, ...nextChunk];
            const newTypedText = [...currentState.typedText, ...nextChunk.map(() => new Array().fill(undefined))];
            const newWordLocked = [...currentState.wordLocked, ...nextChunk.map(() => false)];

            this.updateDrillState({
                sourceText: newSourceText,
                typedText: newTypedText,
                wordLocked: newWordLocked
            });
        }
    }
} 