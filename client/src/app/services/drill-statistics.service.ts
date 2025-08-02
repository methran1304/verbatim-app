import { Injectable } from '@angular/core';
import { KeyStroke } from '../models/interfaces/typed-char.interface';
import { DrillStatistic, PointTimeData } from '../models/interfaces/drill-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class DrillStatisticsService {

  constructor() { }

  /**
   * Updates WPM and accuracy based on typed text and elapsed time
   * @param typedText - Array of typed keystrokes
   * @param startTime - When the drill started
   * @returns Object containing wpm and accuracy
   */
  updateWPMAndAccuracy(typedText: (KeyStroke | undefined)[][], startTime: number): { wpm: number; accuracy: number } {
    // only count actual typed characters
    const flattened = typedText.flat();
    const typedChars = flattened.filter((k) => k !== undefined);
    const correctChars = typedChars.filter((k) => k?.correct).length;

    const elapsedMinutes = (Date.now() - startTime) / 60000;

    const wpm = Math.floor(correctChars / 5 / elapsedMinutes);

    const totalKeystrokes = typedChars.length;
    const accuracy = totalKeystrokes
      ? Math.floor((correctChars / totalKeystrokes) * 100)
      : 100;

    return { wpm, accuracy };
  }

  /**
   * Adds a time series data point for real-time statistics tracking
   * @param timePoint - Current time point
   * @param wpm - Current WPM
   * @param accuracy - Current accuracy
   * @param correctionsThisSecond - Corrections made this second
   * @param wordsCompletedThisSecond - Words completed this second
   * @param wordsIncorrectThisSecond - Words incorrect this second
   * @param realTimeData - Existing real-time data array
   * @param lastDataPointTime - Last data point time
   * @returns Object containing updated realTimeData and lastDataPointTime
   */
  addTimeSeriesDataPoint(
    timePoint: number,
    wpm: number,
    accuracy: number,
    correctionsThisSecond: number,
    wordsCompletedThisSecond: number[],
    wordsIncorrectThisSecond: number[],
    realTimeData: PointTimeData[],
    lastDataPointTime: number
  ): { realTimeData: PointTimeData[]; lastDataPointTime: number } {
    const expectedTimePoints = Array.from({ length: timePoint + 1 }, (_, i) => i);

    for (const expectedTimePoint of expectedTimePoints) {
      // check if we already have this time point
      const existingIndex = realTimeData.findIndex(dp => dp.timePoint === expectedTimePoint);

      if (existingIndex === -1) {
        // add missing time point
        const dataPoint: PointTimeData = {
          timePoint: expectedTimePoint,
          wpm: wpm,
          accuracy: accuracy,
          corrections: correctionsThisSecond,
          incorrectWords: [...wordsIncorrectThisSecond],
          correctWords: [...wordsCompletedThisSecond]
        };

        realTimeData.push(dataPoint);
      } else if (expectedTimePoint === timePoint) {
        // update current time point with latest data
        realTimeData[existingIndex] = {
          timePoint: expectedTimePoint,
          wpm: wpm,
          accuracy: accuracy,
          corrections: correctionsThisSecond,
          incorrectWords: [...wordsIncorrectThisSecond],
          correctWords: [...wordsCompletedThisSecond]
        };
      }
    }

    // update last data point time
    const newLastDataPointTime = Math.max(lastDataPointTime, timePoint);

    return { realTimeData, lastDataPointTime: newLastDataPointTime };
  }

  /**
   * Resets drill statistics to initial state
   * @returns Fresh DrillStatistic object
   */
  resetDrillStats(): DrillStatistic {
    return {
      errorRate: 0,
      wpm: 0,
      accuracy: 0,
      avgWPM: 0,
      avgAccuracy: 0,
      maxWPM: 0,
      maxAccuracy: 0,
      errorMap: {
        wordErrorMap: {},
        charErrorMap: {},
      },
      totalCorrections: 0,
      wordsCount: 0,
      lettersCount: 0,
      correctWords: 0,
      correctLetters: 0,
      incorrectWords: 0,
      incorrectLetters: 0,
      duration: 0,
      realTimeData: [],
    };
  }

  /**
   * Pads a number with leading zeros
   * @param num - Number to pad
   * @returns Padded string
   */
  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
} 