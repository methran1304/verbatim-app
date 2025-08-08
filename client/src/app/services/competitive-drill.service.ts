import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignalRService, Player } from './signalr.service';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import { DrillLength } from '../models/enums/drill-length.enum';
import { JwtDecoderUtil } from '../core/utils/jwt-decoder.util';

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

    // Player management
    private playersSubject = new BehaviorSubject<Player[]>([]);
    public players$ = this.playersSubject.asObservable();

    constructor(
        private signalRService: SignalRService
    ) {
        this.initializeSignalRSubscriptions();
    }

    private initializeSignalRSubscriptions(): void {
        // subscribe to room creation events
        this.signalRService.onRoomCreated$.subscribe(({ roomId, roomCode }) => {
            const currentState = this.roomStateSubject.value;
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

            // add the room creator as the first player
            const token = localStorage.getItem('accessToken') || '';
            const currentUserId = JwtDecoderUtil.getUserId(token) || '';
            if (currentUserId) {
                const creatorPlayer: Player = {
                    userId: currentUserId,
                    username: `User${currentUserId.substring(0, 4)}`, // match server logic
                    level: 1, // match server logic
                    state: 'Connected',
                    statistics: undefined
                };
                this.addPlayer(creatorPlayer);
            }
        });

        // Subscribe to room join events
        this.signalRService.onRoomJoined$.subscribe(({ roomId, roomCode }) => {
            const currentState = this.roomStateSubject.value;
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
        this.signalRService.onPlayerJoin$.subscribe(({ roomId, player }) => {
            this.addPlayer(player);
        });

        // subscribe to player leave events
        this.signalRService.onPlayerLeave$.subscribe(({ roomId, playerId }) => {
            this.removePlayer(playerId);
        });

        // subscribe to player ready events
        this.signalRService.onPlayerReady$.subscribe(({ roomId, playerId }) => {
            // Toggle the ready state for the player
            const currentPlayers = this.playersSubject.value;
            const currentPlayer = currentPlayers.find(p => p.userId === playerId);
            const isCurrentlyReady = currentPlayer?.state === 'Ready';
            this.updatePlayerReady(playerId, !isCurrentlyReady);
        });

        // subscribe to start drill events
        this.signalRService.onStartDrill$.subscribe(() => {
            this.updateRoomState({
                ...this.roomStateSubject.value,
                roomState: 'InProgress',
                showRoomModeOverlay: false
            });
        });

        // subscribe to room disbanded events
        this.signalRService.onRoomDisbanded$.subscribe(({ roomId, reason }) => {
            this.resetState();
            // You could show a notification here about why the room was disbanded
        });
    }

    public async initializeCompetitiveMode(): Promise<void> {
        // always start fresh - show room overlay
        this.updateRoomState({
            showRoomOverlay: true,
            showRoomModeOverlay: false,
            roomCode: '',
            userRole: 'Member',
            roomState: 'Waiting',
            isCreatingRoom: false,
            isJoiningRoom: false
        });
        
        // Clear any existing player data
        this.playersSubject.next([]);
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
            this.resetState();
        }
    }

    public async toggleReady(): Promise<void> {
        try {
            const roomCode = this.roomStateSubject.value.roomCode;
            const currentUserId = this.getCurrentUserId();
            
            // find current player's ready state
            const currentPlayers = this.playersSubject.value;
            const currentPlayer = currentPlayers.find(p => p.userId === currentUserId);
            const isCurrentlyReady = currentPlayer?.state === 'Ready';
            
            // toggle the ready state
            await this.signalRService.setPlayerReady(roomCode, !isCurrentlyReady);
        } catch (error) {
            console.error('Error toggling ready status:', error);
            throw error;
        }
    }

    private getCurrentUserId(): string {
        const token = localStorage.getItem('accessToken') || '';
        return JwtDecoderUtil.getUserId(token) || '';
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
        this.updateRoomState({
            showRoomOverlay: true,
            showRoomModeOverlay: false,
            roomCode: '',
            userRole: 'Member',
            roomState: 'Waiting',
            isCreatingRoom: false,
            isJoiningRoom: false
        });
        this.playersSubject.next([]);
    }

    // Player management methods
    private addPlayer(player: Player): void {
        const currentPlayers = this.playersSubject.value;
        const existingPlayerIndex = currentPlayers.findIndex(p => p.userId === player.userId);
        
        if (existingPlayerIndex >= 0) {
            // update existing player
            const updatedPlayers = [...currentPlayers];
            updatedPlayers[existingPlayerIndex] = player;
            this.playersSubject.next(updatedPlayers);
        } else {
            // add new player
            this.playersSubject.next([...currentPlayers, player]);
        }
    }

    private removePlayer(playerId: string): void {
        const currentPlayers = this.playersSubject.value;
        const updatedPlayers = currentPlayers.filter(p => p.userId !== playerId);
        this.playersSubject.next(updatedPlayers);
    }

    private updatePlayerReady(playerId: string, isReady: boolean): void {
        const currentPlayers = this.playersSubject.value;
        const updatedPlayers = currentPlayers.map(player => 
            player.userId === playerId 
                ? { ...player, state: isReady ? 'Ready' as const : 'Connected' as const }
                : player
        );
        this.playersSubject.next(updatedPlayers);
    }

    public getCurrentPlayers(): Player[] {
        return this.playersSubject.value;
    }

    public isCurrentUserReady(): boolean {
        const currentUserId = this.getCurrentUserId();
        const currentPlayers = this.playersSubject.value;
        const currentPlayer = currentPlayers.find(p => p.userId === currentUserId);
        return currentPlayer?.state === 'Ready';
    }
}
