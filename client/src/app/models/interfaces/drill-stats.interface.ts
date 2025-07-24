export interface DrillStats {
    wpm: number;
    accuracy: number;
    errorMap: ErrorMap;
    corrections: number;
    wordsCount: number;
    lettersCount: number;
    correctWords: number;
    correctLetters: number;
    incorrectWords: number;
    incorrectLetters: number;
    startTime?: number;
    endTime?: number;
    duration: number; // in second
}

export interface ErrorMap {
    wordErrorMap: Record<string, number>;
    charErrorMap: Record<string, number>;
}


export interface DrillStatsResponse extends DrillStats {
    wpmDelta: number;
    accuracyDelta: number;
    wordsCountDelta: number;
    correctWordsDelta: number;
    incorrectWordsDelta: number;
    lettersCountDelta: number;
    correctLettersDelta: number;
    incorrectLettersDelta: number;
    casualPointsDelta: number;
}