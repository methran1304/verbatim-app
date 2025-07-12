import { Injectable } from '@angular/core';
import { WORD_POOL } from '../assets/word-pool';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import {
    DrillLength,
    DrillLengthWordCount,
} from '../models/enums/drill-length.enum';
import { TextProcessor } from '../core/utils/text-processor.util';

@Injectable({
    providedIn: 'root',
})
export class DrillTextService {
    getRandomDrillText(
        difficulty: DrillDifficulty,
        drillLength: DrillLength,
    ): string[] {
        const basicWords = WORD_POOL.Common.concat(WORD_POOL.Beginner);
        const wordCount = DrillLengthWordCount[drillLength];
        let difficultyWords: string[] = [];

        switch (difficulty) {
            case DrillDifficulty.Beginner:
                difficultyWords = WORD_POOL.Beginner;
                break;
            case DrillDifficulty.Intermediate:
                difficultyWords = WORD_POOL.Intermediate;
                break;
            case DrillDifficulty.Advanced:
                difficultyWords = WORD_POOL.Advanced;
                break;
        }

        // combine 30% common words and 70% difficulty
        let commonWordsCount = Math.floor(0.8 * wordCount);
        let difficultyWordsCount = Math.floor(0.2 * wordCount);

        // Select random words from each category
        const shuffledCommonWords = [...basicWords].sort(
            () => Math.random() - 0.5,
        );
        const shuffledDifficultyWords = [...difficultyWords].sort(
            () => Math.random() - 0.5,
        );

        const selectedCommonWords = shuffledCommonWords.slice(
            0,
            commonWordsCount,
        );
        const selectedDifficultyWords = shuffledDifficultyWords.slice(
            0,
            difficultyWordsCount,
        );

        // Combine and shuffle the final result
        const combinedWords = [
            ...selectedCommonWords,
            ...selectedDifficultyWords,
        ].sort(() => Math.random() - 0.5);

        return combinedWords;
    }
}
