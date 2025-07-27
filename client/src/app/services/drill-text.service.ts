import { Injectable } from '@angular/core';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import {
    DrillLength,
    DrillLengthWordCount,
} from '../models/enums/drill-length.enum';
import wordPoolData from '../../assets/word-pool.json';

interface WordPool {
    short: string[];
    medium: string[];
    long: string[];
}

@Injectable({
    providedIn: 'root',
})
export class DrillTextService {
    private wordPool: WordPool = wordPoolData;

    getRandomDrillText(
        difficulty: DrillDifficulty,
        drillLength: DrillLength,
    ): string[] {
        const wordCount = DrillLengthWordCount[drillLength];
        let difficultyWords: string[] = [];
        let shortWords: string[] = this.wordPool.short;

        switch (difficulty) {
            case DrillDifficulty.Beginner:
                difficultyWords = this.wordPool.short;
                break;
            case DrillDifficulty.Intermediate:
                difficultyWords = this.wordPool.medium;
                break;
            case DrillDifficulty.Advanced:
                difficultyWords = this.wordPool.long;
                break;
        }

        // short words only
        if (difficulty === DrillDifficulty.Beginner) {
            const shuffledWords = [...difficultyWords].sort(() => Math.random() - 0.5);
            return shuffledWords.slice(0, wordCount).sort(() => Math.random() - 0.5);
        }

        // mix 70% difficulty words + 30% short words
        const difficultyWordsCount = Math.floor(0.7 * wordCount);
        const shortWordsCount = Math.floor(0.3 * wordCount);

        // select random words from each category
        const shuffledDifficultyWords = [...difficultyWords].sort(() => Math.random() - 0.5);
        const shuffledShortWords = [...shortWords].sort(() => Math.random() - 0.5);

        const selectedDifficultyWords = shuffledDifficultyWords.slice(0, difficultyWordsCount);
        const selectedShortWords = shuffledShortWords.slice(0, shortWordsCount);

        // combine and shuffle the final result
        const combinedWords = [
            ...selectedDifficultyWords,
            ...selectedShortWords,
        ].sort(() => Math.random() - 0.5);

        return combinedWords;
    }

    

}
