import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignalRService } from './signalr.service';
import { RoomSessionService } from './room-session.service';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import { DrillLength } from '../models/enums/drill-length.enum';

export interface RoomState {
    showRoomOverlay: boolean;
    showRoomModeOverlay: boolean;
    roomCode: string;
    userRole: 'Creator' | 'Member';
    roomState: 'Waiting' | 'Ready' | 'InProgress' | 'Finished';
    isCreatingRoom: boolean;
    isJoiningRoom: boolean;
    drillType?: string;
    difficulty?: string;
    duration?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CompetitiveDrillService {
    private roomStateSubject = new BehaviorSubject<RoomState>({
        showRoomOverlay: false,
        showRoomModeOverlay: false,
        roomCode: '',
        userRole: 'Member',
        roomState: 'Waiting',
        isCreatingRoom: false,
        isJoiningRoom: false,
        drillType: 'Timed',
        difficulty: 'Intermediate',
        duration: '60s'
    });

    public roomState$ = this.roomStateSubject.asObservable();

    constructor(
        private signalRService: SignalRService,
        private roomSessionService: RoomSessionService
    ) {
        this.initializeSignalRSubscriptions();
    }

    private initializeSignalRSubscriptions(): void {
        // subscribe to room creation events
        this.signalRService.onRoomCreated$.subscribe(({ roomId, roomCode }) => {
            const currentState = this.roomStateSubject.value;
            this.roomSessionService.setRoomSession(roomCode, 'Creator');
            this.updateRoomState({
                showRoomOverlay: false,
                showRoomModeOverlay: true,
                roomCode: roomCode,
                userRole: 'Creator',
                roomState: 'Waiting',
                isCreatingRoom: false,
                isJoiningRoom: false,
                drillType: currentState.drillType,
                difficulty: currentState.difficulty,
                duration: currentState.duration
            });
        });

        // Subscribe to room join events
        this.signalRService.onRoomJoined$.subscribe(({ roomId, roomCode }) => {
            const currentState = this.roomStateSubject.value;
            this.roomSessionService.setRoomSession(roomCode, 'Member');
            this.updateRoomState({
                showRoomOverlay: false,
                showRoomModeOverlay: true,
                roomCode: roomCode,
                userRole: 'Member',
                roomState: 'Waiting',
                isCreatingRoom: false,
                isJoiningRoom: false,
                drillType: currentState.drillType,
                difficulty: currentState.difficulty,
                duration: currentState.duration
            });
        });

        // subscribe to player join events
        this.signalRService.onPlayerJoin$.subscribe((player) => {
            // update room state if needed
            console.log('Player joined:', player);
        });

        // subscribe to player leave events
        this.signalRService.onPlayerLeave$.subscribe((player) => {
            // update room state if needed
            console.log('Player left:', player);
        });

        // subscribe to player ready events
        this.signalRService.onPlayerReady$.subscribe((player) => {
            // update room state if needed
            console.log('Player ready:', player);
        });

        // subscribe to start drill events
        this.signalRService.onStartDrill$.subscribe(() => {
            this.updateRoomState({
                ...this.roomStateSubject.value,
                roomState: 'InProgress',
                showRoomModeOverlay: false
            });
        });
    }

    public async initializeCompetitiveMode(): Promise<void> {
        try {
            const activeRoom = await this.roomSessionService.checkActiveRoom().toPromise();
            if (activeRoom && activeRoom.hasActiveRoom) {
                // user has an active room session, show room mode overlay
                this.updateRoomState({
                    showRoomOverlay: false,
                    showRoomModeOverlay: true,
                    roomCode: activeRoom.roomCode || '',
                    userRole: (activeRoom.role as 'Creator' | 'Member') || 'Member',
                    roomState: (activeRoom.roomState as 'Waiting' | 'Ready' | 'InProgress' | 'Finished') || 'Waiting',
                    isCreatingRoom: false,
                    isJoiningRoom: false
                });
            } else {
                // no active room session, show room overlay
                this.updateRoomState({
                    showRoomOverlay: true,
                    showRoomModeOverlay: false,
                    roomCode: '',
                    userRole: 'Member',
                    roomState: 'Waiting',
                    isCreatingRoom: false,
                    isJoiningRoom: false
                });
            }
        } catch (error) {
            console.error('Error checking active room session:', error);
            // on error, show room overlay
            this.updateRoomState({
                showRoomOverlay: true,
                showRoomModeOverlay: false,
                roomCode: '',
                userRole: 'Member',
                roomState: 'Waiting',
                isCreatingRoom: false,
                isJoiningRoom: false
            });
        }
    }

    public async createRoom(type: string, difficulty: DrillDifficulty, duration?: number, length?: DrillLength): Promise<void> {
        // convert enum values to display strings
        const drillTypeLabel = type === 'Timed' ? 'Timed' : 'Marathon';
        const difficultyLabel = difficulty === DrillDifficulty.Beginner ? 'Beginner' : 
                               difficulty === DrillDifficulty.Intermediate ? 'Intermediate' : 'Advanced';
        const durationLabel = duration ? `${duration}s` : 
                             length === DrillLength.Short ? '30' : 
                             length === DrillLength.Medium ? '50' : '100';

        this.updateRoomState({
            ...this.roomStateSubject.value,
            isCreatingRoom: true,
            drillType: drillTypeLabel,
            difficulty: difficultyLabel,
            duration: durationLabel
        });

        try {
            const result = await this.signalRService.createRoom({
                type: type as any,
                difficulty: difficulty,
                duration: duration,
                length: length === DrillLength.Short ? 30 : length === DrillLength.Medium ? 50 : 100
            });
        } catch (error) {
            console.error('Error creating room:', error);
            this.updateRoomState({
                ...this.roomStateSubject.value,
                isCreatingRoom: false
            });
            throw error;
        }
    }

    public async joinRoom(roomCode: string): Promise<void> {
        this.updateRoomState({
            ...this.roomStateSubject.value,
            isJoiningRoom: true
        });

        try {
            await this.signalRService.joinRoom(roomCode);
        } catch (error) {
            console.error('Error joining room:', error);
            this.updateRoomState({
                ...this.roomStateSubject.value,
                isJoiningRoom: false
            });
            throw error;
        }
    }

    public async leaveRoom(): Promise<void> {
        try {
            await this.signalRService.leaveRoom(this.roomStateSubject.value.roomCode);
        } catch (error) {
            console.error('Error leaving room:', error);
        } finally {
            this.roomSessionService.clearRoomSession();
            this.updateRoomState({
                showRoomOverlay: true,
                showRoomModeOverlay: false,
                roomCode: '',
                userRole: 'Member',
                roomState: 'Waiting',
                isCreatingRoom: false,
                isJoiningRoom: false
            });
        }
    }

    public async setReady(): Promise<void> {
        try {
            await this.signalRService.setPlayerReady(this.roomStateSubject.value.roomCode, true);
        } catch (error) {
            console.error('Error setting ready status:', error);
            throw error;
        }
    }

    public async startDrill(): Promise<void> {
        try {
            await this.signalRService.startDrill(this.roomStateSubject.value.roomCode);
        } catch (error) {
            console.error('Error starting drill:', error);
            throw error;
        }
    }

    public goBackToRoomOverlay(): void {
        this.updateRoomState({
            ...this.roomStateSubject.value,
            showRoomOverlay: true,
            showRoomModeOverlay: false,
            isCreatingRoom: false,
            isJoiningRoom: false
        });
    }

    public getCurrentRoomState(): RoomState {
        return this.roomStateSubject.value;
    }

    private updateRoomState(newState: Partial<RoomState>): void {
        this.roomStateSubject.next({
            ...this.roomStateSubject.value,
            ...newState
        });
    }

    public resetState(): void {
        this.roomSessionService.clearRoomSession();
        this.updateRoomState({
            showRoomOverlay: false,
            showRoomModeOverlay: false,
            roomCode: '',
            userRole: 'Member',
            roomState: 'Waiting',
            isCreatingRoom: false,
            isJoiningRoom: false
        });
    }
}
