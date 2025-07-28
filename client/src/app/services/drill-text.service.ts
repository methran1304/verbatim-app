import { Injectable } from '@angular/core';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import {
    DrillLength,
    DrillLengthWordCount,
} from '../models/enums/drill-length.enum';
import wordPoolData from '../../assets/word-pool.json';

interface WordPool {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
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

        switch (difficulty) {
            case DrillDifficulty.Beginner:
                difficultyWords = this.wordPool.beginner;
                break;
            case DrillDifficulty.Intermediate:
                difficultyWords = this.wordPool.intermediate;
                break;
            case DrillDifficulty.Advanced:
                difficultyWords = this.wordPool.advanced;
                break;
        }

        // For all difficulties, use words from the appropriate difficulty category
        // Mix with some beginner words for variety (except for beginner difficulty)
        if (difficulty === DrillDifficulty.Beginner) {
            // Beginner difficulty: use only beginner words
            const shuffledWords = [...difficultyWords].sort(() => Math.random() - 0.5);
            return shuffledWords.slice(0, wordCount).sort(() => Math.random() - 0.5);
        } else {
            // Intermediate and Advanced: mix 70% difficulty words + 30% beginner words
            const difficultyWordsCount = Math.floor(0.7 * wordCount);
            const beginnerWordsCount = wordCount - difficultyWordsCount; // ensure exact count

            // select random words from each category
            const shuffledDifficultyWords = [...difficultyWords].sort(() => Math.random() - 0.5);
            const shuffledBeginnerWords = [...this.wordPool.beginner].sort(() => Math.random() - 0.5);

            const selectedDifficultyWords = shuffledDifficultyWords.slice(0, difficultyWordsCount);
            const selectedBeginnerWords = shuffledBeginnerWords.slice(0, beginnerWordsCount);

            // combine and shuffle the final result
            const combinedWords = [
                ...selectedDifficultyWords,
                ...selectedBeginnerWords,
            ].sort(() => Math.random() - 0.5);

            return combinedWords;
        }
    }

    

}
