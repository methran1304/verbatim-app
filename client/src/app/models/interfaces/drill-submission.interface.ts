import { DrillDifficulty } from "../enums/drill-difficulty.enum";
import { DrillType } from "../enums/drill-type.enum";
import { DrillStatistic } from "./drill-stats.interface";

export interface DrillSubmissionRequest {
    drillDifficulty: DrillDifficulty;
    drillType: DrillType;
    drillStatistic: DrillStatistic;
}

export interface DrillSubmissionResponse {
    drillId: string;
    avgWPM: StatDifference;
    avgAccuracy: StatDifference;
    avgCorrections: StatDifference;
    avgErrorRate: StatDifference;
    totalWords: StatDifference;
    totalLetters: StatDifference;
    totalCorrectWords: StatDifference;
    totalIncorrectWords: StatDifference;
    totalCorrectLetters: StatDifference;
    totalIncorrectLetters: StatDifference;
    maxWPM: StatDifference;
    maxAccuracy: StatDifference;
    userPoints: StatDifference;
    totalDrillDuration: StatDifference;
}

export interface StatDifference {
    current: number;
    new: number;
    difference: number;
}