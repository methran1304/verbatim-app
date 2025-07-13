export interface DrillStats {
    wpm: number;
    accuracy: number;
    errorMap: ErrorMap;
    corrections: number;
}

export interface ErrorMap {
    wordErrorMap: Record<string, number>;
    charErrorMap: Record<string, number>;
}
