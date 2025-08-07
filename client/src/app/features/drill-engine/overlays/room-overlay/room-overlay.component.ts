import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DrillType } from '../../../../models/enums/drill-type.enum';
import { DrillDifficulty as LocalDrillDifficulty } from '../../../../models/enums/drill-difficulty.enum';
import { DrillLength, DrillLengthWordCount } from '../../../../models/enums/drill-length.enum';
import { SignalRService, CompetitiveDrillType, DrillDifficulty } from '../../../../services/signalr.service';
import { RoomSessionService } from '../../../../services/room-session.service';
import { CompetitiveDrillService } from '../../../../services/competitive-drill.service';

@Component({
    selector: 'app-room-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule, NzInputModule, NzSelectModule, NzIconModule, FormsModule],
    templateUrl: './room-overlay.component.html',
    styleUrl: './room-overlay.component.scss',
})
export class RoomOverlayComponent implements OnInit, OnDestroy {
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

    private subscriptions: Subscription[] = [];

    constructor(
        private signalRService: SignalRService,
        private notification: NzNotificationService,
        private roomSessionService: RoomSessionService,
        private competitiveDrillService: CompetitiveDrillService
    ) {}

    ngOnInit(): void {
        // subscribe to room creation events
        this.subscriptions.push(
            this.signalRService.onRoomCreated$.subscribe(({ roomId, roomCode }) => {
                this.notification.success('Success', `Room created successfully! Room code: ${roomCode}`);
            })
        );

        // subscribe to room join events (for the joining player)
        this.subscriptions.push(
            this.signalRService.onRoomJoined$.subscribe(({ roomId, roomCode }) => {
                this.notification.success('Success', `Successfully joined room: ${roomCode}`);
            })
        );

        this.subscriptions.push(
            this.signalRService.onPlayerJoin$.subscribe(({ roomId, player }) => {
                this.notification.info('Player Joined', `${player.username} joined the room`);
            })
        );

        this.subscriptions.push(
            this.signalRService.onPlayerLeave$.subscribe(({ roomId, playerId }) => {
                this.notification.warning('Player Left', `A player left the room`);
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        // only connect to SignalR when the overlay is shown
        if (changes['show'] && changes['show'].currentValue === true) {
            this.connectToSignalR();
        }
    }

    private async connectToSignalR(): Promise<void> {
        try {
            if (!this.signalRService.isConnected()) {
                await this.signalRService.connect();
            }
        } catch (error) {
            this.notification.error('Connection Error', `Failed to connect to SignalR: ${error}`);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

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

    async onJoinWithCode(): Promise<void> {
        if (this.roomCode.trim().length === 6) {
            try {
                await this.competitiveDrillService.joinRoom(this.roomCode.trim());
                    } catch (error) {
            this.notification.error('Join Error', `Failed to join room: ${error}`);
        }
        }
    }

    async onCreateRoom(): Promise<void> {
        try {
            const type = this.selectedType === DrillType.Timed ? 'Timed' : 'Marathon';
            await this.competitiveDrillService.createRoom(
                type,
                this.selectedDifficulty,
                this.selectedType === DrillType.Timed ? this.selectedDuration : undefined,
                this.selectedType === DrillType.Marathon ? this.selectedLength : undefined
            );
        } catch (error) {
            console.error('Room creation error:', error);
            this.notification.error('Creation Error', `Failed to create room: ${error}`);
        }
    }

    async onJoinRoom(): Promise<void> {
        if (!this.roomCode || this.roomCode.length !== 6) {
            this.notification.error('Invalid Code', 'Please enter a valid 6-character room code');
            return;
        }

        try {
            await this.competitiveDrillService.joinRoom(this.roomCode);
        } catch (error) {
            console.error('Room join error:', error);
            this.notification.error('Join Error', `Failed to join room: ${error}`);
        }
    }

    onRoomCodeInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        this.roomCode = value.slice(0, 6);
        input.value = this.roomCode;
    }

    onTypeChange(event: any): void {
        if (this.selectedType === DrillType.Marathon) {
            this.selectedDuration = 0;
        }
    }
} 