export enum DrillLength {
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Marathon = 'Marathon',
    Test = 'Test',
}

export const DrillLengthWordCount: Record<DrillLength, number> = {
    [DrillLength.Test]: 10,
    [DrillLength.Short]: 30,
    [DrillLength.Medium]: 50,
    [DrillLength.Long]: 100,
    [DrillLength.Marathon]: 500,
};
