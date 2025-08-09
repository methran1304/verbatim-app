export enum DrillLength {
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Extended = 'Extended',
    Test = 'Test',
}

export const DrillLengthWordCount: Record<DrillLength, number> = {
    [DrillLength.Test]: 10,
    [DrillLength.Short]: 30,
    [DrillLength.Medium]: 50,
    [DrillLength.Long]: 100,
    [DrillLength.Extended]: 500,
};
