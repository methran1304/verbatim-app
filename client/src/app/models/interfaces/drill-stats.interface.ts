import { DrillDifficulty } from "../enums/drill-difficulty.enum";
import { DrillLength } from "../enums/drill-length.enum";
import { DrillType } from "../enums/drill-type.enum";

export interface DrillStatistic {
    wpm: number;
    accuracy: number;
    avgWPM: number;
    avgAccuracy: number;
    maxWPM: number;
    maxAccuracy: number;
    errorMap: ErrorMap;
    totalCorrections: number;
    wordsCount: number;
    lettersCount: number;
    correctWords: number;
    correctLetters: number;
    incorrectWords: number;
    incorrectLetters: number;
    errorRate: number; // Error rate for this drill (percentage)
    duration: number; // in seconds
    realTimeData: PointTimeData[]; // Add time series data
}

export interface PointTimeData {
    timePoint: number; // seconds like 0, 1, 2, 3...
    wpm: number;
    accuracy: number;
    corrections: number;
    incorrectWords: number[]; // indices of words that had error in that second
    correctWords: number[]; // indices of completed words in that second
}

export interface ErrorMap {
    wordErrorMap: Record<string, number>;
    charErrorMap: Record<string, number>;
} 