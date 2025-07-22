import { DrillDifficulty } from "../enums/drill-difficulty.enum"
import { DrillLength } from "../enums/drill-length.enum";

export interface DrillPreference {
    drillDifficulty: DrillDifficulty;
    drillLength: DrillLength;
    drillDuration: number;
};