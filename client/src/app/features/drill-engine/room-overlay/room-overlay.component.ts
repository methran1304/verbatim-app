import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { DrillType } from '../../../models/enums/drill-type.enum';
import { DrillDifficulty } from '../../../models/enums/drill-difficulty.enum';
import { DrillLength, DrillLengthWordCount } from '../../../models/enums/drill-length.enum';

@Component({
    selector: 'app-room-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule, NzSelectModule, NzFormModule, FormsModule],
    templateUrl: './room-overlay.component.html',
    styleUrl: './room-overlay.component.scss',
})
export class RoomOverlayComponent {
    @Input() show: boolean = false;
    @Input() isCreatingRoom: boolean = false;
    @Input() isJoiningRoom: boolean = false;
    
    @Output() createRoom = new EventEmitter<void>();
    @Output() joinRoom = new EventEmitter<void>();
    @Output() joinRoomWithCode = new EventEmitter<string>();
    @Output() goBack = new EventEmitter<void>();

    currentView: 'main' | 'join' | 'create' = 'main';
    roomCode: string = '';
    
    // Room creation settings
    selectedType: DrillType = DrillType.Timed;
    selectedDifficulty: DrillDifficulty = DrillDifficulty.Intermediate;
    selectedDuration: number = 60;
    selectedLength: DrillLength = DrillLength.Medium;

    // Options arrays for dropdowns
    drillTypes = [
        { label: 'Timed', value: DrillType.Timed },
        { label: 'Marathon', value: DrillType.Marathon }
    ];

    drillDifficulties = [
        { label: 'Beginner', value: DrillDifficulty.Beginner },
        { label: 'Intermediate', value: DrillDifficulty.Intermediate },
        { label: 'Advanced', value: DrillDifficulty.Advanced }
    ];

    drillDurations = [
        { label: '30s', value: 30 },
        { label: '60s', value: 60 },
        { label: '120s', value: 120 }
    ];

    drillLengths = [
        { label: 'Short (30)', value: DrillLength.Short, wordCount: DrillLengthWordCount[DrillLength.Short] },
        { label: 'Medium (50)', value: DrillLength.Medium, wordCount: DrillLengthWordCount[DrillLength.Medium] },
        { label: 'Long (100)', value: DrillLength.Long, wordCount: DrillLengthWordCount[DrillLength.Long] }
    ];

    // Make enums available in template
    DrillType = DrillType;

    onJoinRoomClick(): void {
        this.currentView = 'join';
    }

    onCreateRoomClick(): void {
        this.currentView = 'create';
    }

    onGoBack(): void {
        this.currentView = 'main';
        this.roomCode = '';
        this.goBack.emit();
    }

    onJoinWithCode(): void {
        if (this.roomCode.trim().length === 6) {
            this.joinRoomWithCode.emit(this.roomCode.trim());
        }
    }

    onCreateRoom(): void {
        const roomSettings = {
            type: this.selectedType,
            difficulty: this.selectedDifficulty,
            duration: this.selectedType === DrillType.Timed ? this.selectedDuration : undefined,
            length: this.selectedType === DrillType.Marathon ? this.selectedLength : undefined
        };
        this.createRoom.emit();
    }

    onRoomCodeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        this.roomCode = value.slice(0, 6);
        input.value = this.roomCode;
    }
} 