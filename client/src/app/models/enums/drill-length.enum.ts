export enum DrillLength {
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Marathon = 'Marathon'
};

export const DrillLengthWordCount: Record<DrillLength, number> = {
    [DrillLength.Short]: 50,
    [DrillLength.Medium]: 70,
    [DrillLength.Long]: 100,
    [DrillLength.Marathon]: 1000
};