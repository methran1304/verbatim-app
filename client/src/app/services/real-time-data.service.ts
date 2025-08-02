import { Injectable } from '@angular/core';
import { PointTimeData } from '../models/interfaces/drill-stats.interface';
import { DrillStatisticsService } from './drill-statistics.service';

@Injectable({
    providedIn: 'root'
})
export class RealTimeDataService {
    // time series data collection
    private realTimeData: PointTimeData[] = [];
    private lastDataPointTime: number = 0;
    private wordsCompletedThisSecond: number[] = [];
    private wordsIncorrectThisSecond: number[] = [];
    private correctionsThisSecond: number = 0;

    constructor(private drillStatisticsService: DrillStatisticsService) {}

    // get real time data
    getRealTimeData(): PointTimeData[] {
        return this.realTimeData;
    }

    // get last data point time
    getLastDataPointTime(): number {
        return this.lastDataPointTime;
    }

    // get words completed this second
    getWordsCompletedThisSecond(): number[] {
        return this.wordsCompletedThisSecond;
    }

    // get words incorrect this second
    getWordsIncorrectThisSecond(): number[] {
        return this.wordsIncorrectThisSecond;
    }

    // get corrections this second
    getCorrectionsThisSecond(): number {
        return this.correctionsThisSecond;
    }

    // add time series data point
    addTimeSeriesDataPoint(timePoint: number, wpm: number, accuracy: number): void {
        const result = this.drillStatisticsService.addTimeSeriesDataPoint(
            timePoint,
            wpm,
            accuracy,
            this.correctionsThisSecond,
            this.wordsCompletedThisSecond,
            this.wordsIncorrectThisSecond,
            this.realTimeData,
            this.lastDataPointTime
        );
        
        this.realTimeData = result.realTimeData;
        this.lastDataPointTime = result.lastDataPointTime;

        // reset the per-second tracking arrays
        this.wordsCompletedThisSecond = [];
        this.wordsIncorrectThisSecond = [];
        this.correctionsThisSecond = 0;
    }

    // add word completed this second
    addWordCompletedThisSecond(wordIndex: number): void {
        this.wordsCompletedThisSecond.push(wordIndex);
    }

    // add word incorrect this second
    addWordIncorrectThisSecond(wordIndex: number): void {
        this.wordsIncorrectThisSecond.push(wordIndex);
    }

    // increment corrections this second
    incrementCorrectionsThisSecond(): void {
        this.correctionsThisSecond++;
    }

    // reset real time data
    resetRealTimeData(): void {
        this.realTimeData = [];
        this.lastDataPointTime = 0;
        this.wordsCompletedThisSecond = [];
        this.wordsIncorrectThisSecond = [];
        this.correctionsThisSecond = 0;
    }
} 