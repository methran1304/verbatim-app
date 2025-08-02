import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { DrillDifficulty } from '../../../models/enums/drill-difficulty.enum';
import { DrillLength, DrillLengthWordCount } from '../../../models/enums/drill-length.enum';

@Component({
    selector: 'app-adaptive-drill-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, NzSelectModule, NzFormModule, FormsModule],
    templateUrl: './adaptive-drill-overlay.component.html',
    styleUrl: './adaptive-drill-overlay.component.scss',
})
export class AdaptiveDrillOverlayComponent implements OnInit, OnChanges {
    @Input() show: boolean = false;
    @Input() isLoadingErrorWords: boolean = false;
    @Input() isGeneratingAdaptive: boolean = false;
    @Input() currentDifficulty: DrillDifficulty = DrillDifficulty.Intermediate;
    @Input() currentLength: DrillLength = DrillLength.Medium;
    
    @Output() viewErrorProneWords = new EventEmitter<{difficulty: DrillDifficulty, length: DrillLength}>();
    @Output() generateAdaptiveDrill = new EventEmitter<{difficulty: DrillDifficulty, length: DrillLength}>();
    
    // Adaptive drill settings - initialized with current values from toolbar
    selectedDifficulty: DrillDifficulty = DrillDifficulty.Intermediate;
    selectedLength: DrillLength = DrillLength.Medium;

    // Options arrays for dropdowns
    drillDifficulties = [
        { label: 'Beginner', value: DrillDifficulty.Beginner },
        { label: 'Intermediate', value: DrillDifficulty.Intermediate },
        { label: 'Advanced', value: DrillDifficulty.Advanced }
    ];

    drillLengths = [
        { label: 'Short (30)', value: DrillLength.Short, wordCount: DrillLengthWordCount[DrillLength.Short] },
        { label: 'Medium (50)', value: DrillLength.Medium, wordCount: DrillLengthWordCount[DrillLength.Medium] },
        { label: 'Long (100)', value: DrillLength.Long, wordCount: DrillLengthWordCount[DrillLength.Long] }
    ];

    ngOnInit(): void {
        this.initializeSelectedValues();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentDifficulty'] || changes['currentLength']) {
            this.initializeSelectedValues();
        }
    }

    private initializeSelectedValues(): void {
        this.selectedDifficulty = this.currentDifficulty;
        this.selectedLength = this.currentLength;
    }

    onViewErrorProneWords(): void {
        this.viewErrorProneWords.emit({
            difficulty: this.selectedDifficulty,
            length: this.selectedLength
        });
    }

    onGenerateAdaptiveDrill(): void {
        this.generateAdaptiveDrill.emit({
            difficulty: this.selectedDifficulty,
            length: this.selectedLength
        });
    }
} 