import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { DrillDifficulty } from '../../../models/enums/drill-difficulty.enum';
import { DrillLength, DrillLengthWordCount } from '../../../models/enums/drill-length.enum';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DrillPreference } from '../../../models/interfaces/drill-preference.interface';

@Component({
  selector: 'app-drill-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    NzStatisticModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerModule,
    NzIconModule,
    FormsModule,
    NzToolTipModule
  ],
  templateUrl: './drill-toolbar.component.html',
  styleUrl: './drill-toolbar.component.scss',
})
export class DrillToolbarComponent implements OnChanges {
  @Input() wpm: number = 0;
  @Input() accuracy: number = 100;
  @Input() remainingTime: string = '00:00';
  @Input() drillPreference!: DrillPreference;
  @Input() isTyping: boolean = false;
  @Input() disabled: boolean = false;
  @Input() forceCollapsed: boolean = false;
  @Output() restart = new EventEmitter<void>();
  @Output() newDrill = new EventEmitter<void>();
  @Output() drillPreferenceChange = new EventEmitter<DrillPreference>();

  drillDifficulties = [
    { label: 'Beginner', value: DrillDifficulty.Beginner},
    { label: 'Intermediate', value: DrillDifficulty.Intermediate },
    { label: 'Advanced', value: DrillDifficulty.Advanced }
  ];

  drillDurations = [
    { label: 'Test', value: DrillLength.Test, wordCount: DrillLengthWordCount[DrillLength.Test]},
    { label: 'Short', value: DrillLength.Short, wordCount: DrillLengthWordCount[DrillLength.Short]},
    { label: 'Medium', value: DrillLength.Medium, wordCount: DrillLengthWordCount[DrillLength.Medium]},
    { label: 'Long', value: DrillLength.Long, wordCount: DrillLengthWordCount[DrillLength.Long]},
    { label: 'Marathon', value: DrillLength.Marathon, wordCount: DrillLengthWordCount[DrillLength.Marathon]}
  ];

  // animation state
  showControls: boolean = true;
  private animationTimeout: any;
  private hoverTimeout: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isTyping']) {
      this.handleTypingStateChange();
    }
    if (changes['forceCollapsed']) {
      this.handleForceCollapsedChange();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.forceCollapsed) return;
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.showControls = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.forceCollapsed) return;
    if (this.isTyping) {
      // only hide controls if currently typing
      this.hoverTimeout = setTimeout(() => {
        this.showControls = false;
      }, 500); // small delay to prevent flickering
    }
  }

  private handleTypingStateChange(): void {
    if (this.forceCollapsed) return;
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    if (this.isTyping) {
      // delay hiding controls to avoid frequent transitions
      this.animationTimeout = setTimeout(() => {
        this.showControls = false;
      }, 1000); // 1 second delay
    } else {
      // show controls immediately when not typing
      this.showControls = true;
    }
  }

  private handleForceCollapsedChange(): void {
    if (this.forceCollapsed) {
      this.showControls = false;
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
    } else {
      // when forceCollapsed becomes false, expand the toolbar
      this.showControls = true;
      // clear any pending timeouts to ensure clean state transition
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
    }
  }

  onRestart(): void {
    this.restart.emit();
  }

  onNewDrill(): void {
    this.newDrill.emit();
  }

  onDifficultyChange(value: DrillDifficulty): void {
    this.drillPreference = { ...this.drillPreference, drillDifficulty: value };
    this.drillPreferenceChange.emit(this.drillPreference);
  }

  onDurationChange(value: DrillLength): void {
    this.drillPreference = { ...this.drillPreference, drillLength: value };
    this.drillPreferenceChange.emit(this.drillPreference);
  }
} 