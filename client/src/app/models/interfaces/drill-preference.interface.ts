import { DrillDifficulty } from "../enums/drill-difficulty.enum"
import { DrillLength } from "../enums/drill-length.enum";
import { DrillType } from "../enums/drill-type.enum";

export interface DrillPreference {
    drillType: DrillType;
    drillDifficulty: DrillDifficulty;
    drillLength: DrillLength;
    drillDuration: number;
};