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
    resumedWordCount: number; // track how many words were resumed
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
        submitError: '',
        resumedWordCount: 0
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


    startDrillWithBookContent(bookContent: string, resumeFromWordIndex: number = 0): void {
        this.updateDrillState({
            showPostDrillOverlay: false,
            isDrillActive: true
        });

        // store full book content for chunked loading
        this.fullBookContent = bookContent;
        
        // process book content and get all words
        const allWords = this.processBookContentInChunks(bookContent);
        
        // if resuming, we need to load chunks up to the resume point
        let sourceText: string[][] = [];
        let typedText: (any | undefined)[][] = [];
        let wordLocked: boolean[] = [];
        
        if (resumeFromWordIndex > 0) {
            // load chunks up to the resume point
            let currentWordCount = 0;
            let chunkIndex = 0;
            
            while (currentWordCount < resumeFromWordIndex && chunkIndex < Math.ceil(bookContent.length / this.CHUNK_SIZE)) {
                const chunk = this.loadNextChunk(bookContent, currentWordCount);
                sourceText.push(...chunk);
                typedText.push(...chunk.map(word => new Array(word.length).fill(undefined)));
                wordLocked.push(...chunk.map(() => false));
                currentWordCount += chunk.length;
                chunkIndex++;
            }
            
            // ensure we have enough words to resume from
            if (sourceText.length <= resumeFromWordIndex) {
                // fallback to normal processing if we don't have enough words
                sourceText = allWords;
                typedText = allWords.map(word => new Array(word.length).fill(undefined));
                wordLocked = allWords.map(() => false);
            }
            
            // mark completed words as typed and locked
            for (let i = 0; i < resumeFromWordIndex && i < sourceText.length; i++) {
                const word = sourceText[i];
                typedText[i] = word.map(char => ({
                    key: char,
                    correct: true
                }));
                wordLocked[i] = true;
            }
        } else {
            // normal processing for new books
            sourceText = allWords;
            typedText = allWords.map(word => new Array(word.length).fill(undefined));
            wordLocked = allWords.map(() => false);
        }

        this.updateDrillState({
            sourceText,
            typedText,
            wordLocked,
            currentWordIndex: resumeFromWordIndex,
            currentCharIndex: 0,
            resumedWordCount: resumeFromWordIndex
        });

        // if resuming, update drill statistics to account for completed words
        if (resumeFromWordIndex > 0) {
            const currentState = this.getCurrentDrillState();
            const updatedStats = { ...currentState.drillStatistic };
            
            // count completed words and characters
            let totalCompletedWords = 0;
            let totalCompletedChars = 0;
            
            for (let i = 0; i < resumeFromWordIndex && i < sourceText.length; i++) {
                const word = sourceText[i];
                totalCompletedWords++;
                totalCompletedChars += word.length;
            }
            
            // update statistics
            updatedStats.correctWords = totalCompletedWords;
            updatedStats.correctLetters = totalCompletedChars;
            updatedStats.wordsCount = sourceText.length;
            updatedStats.lettersCount = sourceText.reduce((total, word) => total + word.length, 0);
            
            this.updateDrillState({
                drillStatistic: updatedStats
            });
        }
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
                
                if (word.length > 0) {
                    const chars = word.split('');
                    
                    if (!/[.!?;]$/.test(word)) {
                        chars.push(' ');
                    }

                    sourceText.push(chars);
                    wordCount++;
                }
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
                    if (word.length > 0) {
                        const chars = word.split('');
                        
                        if (!/[.!?;]$/.test(word)) {
                            chars.push(' ');
                        }
                        
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
            if (i < words.length - 1 && !/[.!?;]$/.test(word)) {
                return [...chars, ' '];
            }
            return chars;
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
            sourceText: [],
            typedText: [],
            wordLocked: [],
            isDrillActive: false,
            showPostDrillOverlay: false,
            resumedWordCount: 0
        });
        this.timerManagementService.resetTimer(drillPreferences);
        this.adaptiveService.resetAdaptiveState();
    }

    /**
     * Clear book content and chunk processing state
     * Call this when leaving classics mode or switching drill types
     */
    clearBookContent(): void {
        this.fullBookContent = '';
        // Reset to empty state to prevent chunk processing from continuing
        this.updateDrillState({
            sourceText: [],
            typedText: [],
            wordLocked: [],
            currentWordIndex: 0,
            currentCharIndex: 0,
            resumedWordCount: 0
        });
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
            if (i < words.length - 1 && !/[.!?;]$/.test(word)) {
                return [...chars, ' '];
            }
            return chars;
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
        
        // Don't load chunks if drill is not active (prevents processing after leaving classics)
        if (!currentState.isDrillActive) return false;
        
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