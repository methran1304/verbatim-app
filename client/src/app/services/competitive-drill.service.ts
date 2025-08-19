import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SignalRService, Player, ConnectionState } from './signalr.service';
import { DrillDifficulty } from '../models/enums/drill-difficulty.enum';
import { DrillLength } from '../models/enums/drill-length.enum';
import { DrillType } from '../models/enums/drill-type.enum';
import { DrillPreference } from '../models/interfaces/drill-preference.interface';
import { JwtDecoderUtil } from '../core/utils/jwt-decoder.util';
import { ZorroNotificationServiceTsService } from '../shared/zorro-notification.service.ts.service';
import { AuthService } from './auth.service';

export interface DrillSettings {
    type: DrillType;
    difficulty: DrillDifficulty;
    duration: number;
    length: number;
}

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
    drillSettings?: DrillSettings;
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

    // player management
    private playersSubject = new BehaviorSubject<Player[]>([]);
    public players$ = this.playersSubject.asObservable();

    // drill text management
    private drillTextSubject = new BehaviorSubject<string[]>([]);
    public drillText$ = this.drillTextSubject.asObservable();

    // room disbanded events
    private roomDisbandedSubject = new BehaviorSubject<{ roomId: string; reason: string } | null>(null);
    public roomDisbanded$ = this.roomDisbandedSubject.asObservable();
    
    // prevent duplicate handling of room disband events
    private roomDisbandHandled = false;

    // pending text received at StartDrill; used to start on BeginDrill
    private pendingDrillText: string[] = [];
    
    // subscription management
    private subscriptions: Subscription[] = [];

    constructor(
        private signalRService: SignalRService,
        private router: Router,
        private notificationService: ZorroNotificationServiceTsService,
        private authService: AuthService
    ) {
        // console.log('COMPETITIVE SERVICE: Constructor called - new instance created');
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
            const token = this.authService.getAccessToken() || '';
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

        // subscribe to room join events
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

        // subscribe to player ready events to update player state
        this.signalRService.onPlayerReady$.subscribe(({ roomId, playerId, isReady }) => {
            this.updatePlayerReady(playerId, isReady);
        });

        this.signalRService.onWaitingForPlayersToContinue$.subscribe(({ roomCode, continuedCount, totalCount }) => {
        
        });

        this.signalRService.onAllPlayersContinued$.subscribe(({ roomCode }) => {
            this.updateRoomState({
                ...this.roomStateSubject.value,
                roomState: 'Waiting',
                showRoomModeOverlay: true,
                showRoomOverlay: false
            });
            
            // reset all players to not ready
            const currentPlayers = this.playersSubject.value;
            const resetPlayers = currentPlayers.map(player => ({
                ...player,
                state: 'Connected' as const,
                progress: undefined,
                wpm: undefined,
                accuracy: undefined
            }));
            this.playersSubject.next(resetPlayers);
        });

        // subscribe to start drill events (preload drill text; countdown will follow)
        this.signalRService.onStartDrill$.subscribe(({ roomId, drillText }) => {
            this.pendingDrillText = drillText;
            
            // reset all players to not ready when drill starts
            const currentPlayers = this.playersSubject.value;
            const resetPlayers = currentPlayers.map(player => ({
                ...player,
                state: 'Connected' as const,
                progress: undefined,
                wpm: undefined,
                accuracy: undefined
            }));
            this.playersSubject.next(resetPlayers);
            
            // keep lobby hidden now to prepare UI; actual start happens on begin drill
            this.updateRoomState({
                ...this.roomStateSubject.value,
                showRoomModeOverlay: false
            });
        });

        // subscribe to begin drill events (actual drill start after countdown)
        this.signalRService.onBeginDrill$.subscribe(({ roomId, drillText }) => {
            this.updateRoomState({
                ...this.roomStateSubject.value,
                roomState: 'InProgress',
                showRoomModeOverlay: false
            });
            
            // start the drill with the provided text
            const textToUse = (drillText && drillText.length > 0) ? drillText : this.pendingDrillText;
            this.startCompetitiveDrill(textToUse);
        });

        // subscribe to room disbanded events
        this.signalRService.onRoomDisbanded$.subscribe(({ roomId, reason }) => {
            this.handleRoomDisbandEvent(roomId, reason, 'warning');
        });

        // subscribe to player kicked events
        const kickSub = this.signalRService.onPlayerKicked$.subscribe(({ roomCode, reason }) => {
            this.handleRoomDisbandEvent(roomCode, `Kicked: ${reason}`, 'error');
        });
        this.subscriptions.push(kickSub);

        // subscribe to SignalR connection state for unexpected disconnections
        const connectionSub = this.signalRService.connectionState$.subscribe(state => {
            if (state === ConnectionState.Disconnected && this.roomStateSubject.value.roomCode) {
                console.log(`COMPETITIVE SERVICE: SignalR disconnected unexpectedly while in room`);
                
                // Only trigger cleanup if we were actually in a room
                const currentRoomCode = this.roomStateSubject.value.roomCode;
                if (currentRoomCode) {
                    this.handleRoomDisbandEvent(currentRoomCode, 'Connection lost unexpectedly', 'warning');
                }
            }
        });
        this.subscriptions.push(connectionSub);

        // subscribe to end drill events
        this.signalRService.onEndDrill$.subscribe(({ roomId, results }) => {
            // console.log(`COMPETITIVE SERVICE: EndDrill event received - roomId: ${roomId}`);
            // Update room state to Finished
            this.updateRoomState({
                roomState: 'Finished',
                showRoomModeOverlay: false,
                showRoomOverlay: true
            });
        });

        // subscribe to waiting for other players events
        this.signalRService.onWaitingForOtherPlayers$.subscribe(({ finishedCount, totalCount }) => {
        });

        // subscribe to all players completed events
        this.signalRService.onAllPlayersCompleted$.subscribe(({ roomId }) => {
        });
    }

    private handleRoomDisbandEvent(roomId: string, reason: string, notificationType: 'warning' | 'error' = 'warning'): void {
        // Prevent duplicate handling
        if (this.roomDisbandHandled) {
            console.log('Room disband already handled, ignoring duplicate event');
            return;
        }
        
        this.roomDisbandHandled = true;
        console.log(`COMPETITIVE SERVICE: Handling room disband - roomId: ${roomId}, reason: ${reason}`);
        
        // Emit event to trigger drill engine cleanup
        this.roomDisbandedSubject.next({ roomId, reason });
        
        // Reset state
        this.resetState();
        
        // Show notification to user
        this.notificationService.createNotification(notificationType, 'Left the room', reason);
        
        // Navigate back to main page
        this.router.navigate(['/']);
        
        // Reset the flag after a delay to allow for future events
        setTimeout(() => {
            this.roomDisbandHandled = false;
        }, 3000);
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
        
        // Set up disconnect handler for graceful disconnection
        this.setupDisconnectHandler();
    }

    private setupDisconnectHandler(): void {
        window.addEventListener('beforeunload', async (event) => {
            try {
                
                // if we're in a room, try to leave gracefully
                const currentRoomCode = this.roomStateSubject.value.roomCode;
                if (currentRoomCode) {
                    try {
                        await this.signalRService.leaveRoom(currentRoomCode);
                    } catch (error) {
                        console.error('COMPETITIVE SERVICE: Error leaving room on page unload:', error);
                    }
                }
                
                this.cleanup();
                
                try {
                    await this.signalRService.disconnect();
                } catch (error) {
                    console.error('COMPETITIVE SERVICE: Error disconnecting from SignalR on page unload:', error);
                }
            } catch (error) {
                console.error('COMPETITIVE SERVICE: Error in beforeunload handler:', error);
            }
        });
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
            await this.signalRService.createRoom({
                type: type as any,
                difficulty: difficulty,
                duration: duration,
                length: length === DrillLength.Short ? 30 : length === DrillLength.Medium ? 50 : 100
            });

            // fetch room info back from server to ensure UI reflects authoritative settings
            const roomCode = this.roomStateSubject.value.roomCode;
            if (roomCode) {
                const info = await this.signalRService.getRoomInfo(roomCode);
                if (info.success && info.settings) {
                    const drillSettings: DrillSettings = {
                        type: this.convertStringToType(info.settings.type),
                        difficulty: this.convertStringToDifficulty(info.settings.difficulty),
                        duration: info.settings.duration,
                        length: info.settings.length
                    };
                    
                    this.updateRoomState({
                        drillType: info.settings.type,
                        difficulty: info.settings.difficulty,
                        duration: info.settings.type === 'Timed'
                            ? `${info.settings.duration}s`
                            : `${info.settings.length}`,
                        drillSettings: drillSettings
                    });
                }
            }
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

            // after join, fetch authoritative room settings and update UI
            const info = await this.signalRService.getRoomInfo(roomCode);
            if (info.success && info.settings) {
                const drillSettings: DrillSettings = {
                    type: this.convertStringToType(info.settings.type),
                    difficulty: this.convertStringToDifficulty(info.settings.difficulty),
                    duration: info.settings.duration,
                    length: info.settings.length
                };
                
                this.updateRoomState({
                    roomCode: info.roomCode || roomCode,
                    drillType: info.settings.type,
                    difficulty: info.settings.difficulty,
                    duration: info.settings.type === 'Timed'
                        ? `${info.settings.duration}s`
                        : `${info.settings.length}`,
                    drillSettings: drillSettings
                });
            }
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
        const token = this.authService.getAccessToken() || '';
        return JwtDecoderUtil.getUserId(token) || '';
    }

    public async startDrill(): Promise<void> {
        try {
            const result = await this.signalRService.startDrill(this.roomStateSubject.value.roomCode);
            if (!result.success) {
                // surface server error to the UI via state and let component show a toaster
                throw new Error(result.error || 'Failed to start drill');
            }
        } catch (error) {
            console.error('Error starting drill:', error);
            throw error;
        }
    }

    private startCompetitiveDrill(drillText: string[]): void {
        // console.log(`COMPETITIVE SERVICE: Starting competitive drill with ${drillText.length} words`);
        // emit the drill text to the drill engine exactly as provided by server
        this.drillTextSubject.next(drillText);
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

    // Get drill preferences for competitive mode (overrides local preferences)
    public getCompetitiveDrillPreferences(): DrillPreference | null {
        const roomState = this.roomStateSubject.value;
        if (!roomState.drillSettings) {
            return null;
        }
        
        const settings = roomState.drillSettings;
        return {
            drillType: settings.type,
            drillDifficulty: settings.difficulty,
            drillDuration: settings.duration,
            drillLength: this.convertIntToLength(settings.length)
        };
    }

    private convertIntToLength(length: number): DrillLength {
        switch (length) {
            case 30: return DrillLength.Short;
            case 50: return DrillLength.Medium;
            case 100: return DrillLength.Long;
            default: return DrillLength.Medium;
        }
    }

    private convertStringToType(type: string): DrillType {
        switch (type.toLowerCase()) {
            case 'timed': return DrillType.Timed;
            case 'marathon': return DrillType.Marathon;
            default: return DrillType.Timed;
        }
    }

    private convertStringToDifficulty(difficulty: string): DrillDifficulty {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return DrillDifficulty.Beginner;
            case 'intermediate': return DrillDifficulty.Intermediate;
            case 'advanced': return DrillDifficulty.Advanced;
            default: return DrillDifficulty.Intermediate;
        }
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

    public cleanup(): void {
        try {
            // console.log('COMPETITIVE SERVICE: Cleaning up service state');
            // Clear all subscriptions
            this.subscriptions.forEach(sub => {
                try {
                    sub.unsubscribe();
                } catch (error) {
                    console.error('Error unsubscribing from subscription:', error);
                }
            });
            this.subscriptions.length = 0;
            
            // Reset state
            this.resetState();
            
            // Clear pending drill text
            this.pendingDrillText = [];
            
            // console.log('COMPETITIVE SERVICE: Cleanup completed');
        } catch (error) {
            console.error('COMPETITIVE SERVICE: Error during cleanup:', error);
        }
    }

    // player management methods
    private addPlayer(player: Player): void {
        // console.log(`COMPETITIVE SERVICE: Adding player:`, player);
        const currentPlayers = this.playersSubject.value;
        // console.log(`COMPETITIVE SERVICE: Current players before adding:`, currentPlayers);
        const existingPlayerIndex = currentPlayers.findIndex(p => p.userId === player.userId);
        
        if (existingPlayerIndex >= 0) {
            // update existing player with new properties
            // console.log(`COMPETITIVE SERVICE: Updating existing player at index ${existingPlayerIndex}`);
            const updatedPlayers = [...currentPlayers];
            updatedPlayers[existingPlayerIndex] = {
                ...updatedPlayers[existingPlayerIndex],
                ...player,
                // Preserve existing properties that might not be in the update
                username: player.username || updatedPlayers[existingPlayerIndex].username,
                level: player.level || updatedPlayers[existingPlayerIndex].level,
                // Update state and ready status
                state: player.state || updatedPlayers[existingPlayerIndex].state,
                isReady: player.isReady !== undefined ? player.isReady : updatedPlayers[existingPlayerIndex].isReady,
                isCreator: player.isCreator !== undefined ? player.isCreator : updatedPlayers[existingPlayerIndex].isCreator,
                joinedAt: player.joinedAt || updatedPlayers[existingPlayerIndex].joinedAt
            };
            this.playersSubject.next(updatedPlayers);
        } else {
            // add new player
            // console.log(`COMPETITIVE SERVICE: Adding new player`);
            this.playersSubject.next([...currentPlayers, player]);
        }
        // console.log(`COMPETITIVE SERVICE: Players after update:`, this.playersSubject.value);
    }

    private removePlayer(playerId: string): void {
        const currentPlayers = this.playersSubject.value;
        const updatedPlayers = currentPlayers.filter(p => p.userId !== playerId);
        this.playersSubject.next(updatedPlayers);
    }

    private updatePlayerReady(playerId: string, isReady: boolean): void {
        const currentPlayers = this.playersSubject.value;
        const updatedPlayers = currentPlayers.map(player => {
            if (player.userId === playerId) {
                return { 
                    ...player, 
                    state: isReady ? 'Ready' as const : 'Connected' as const,
                    isReady: isReady
                };
            }
            return player;
        });
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

    public async resetRoomToWaiting(): Promise<void> {
        try {
            const roomCode = this.roomStateSubject.value.roomCode;
            if (roomCode) {
                // notify server that this player is continuing
                await this.signalRService.continueAfterDrill(roomCode);
            }
        } catch (error) {
            console.error('Error notifying server about continue after drill:', error);
            // continue with local state update even if server call fails
        }
        
        // room state will be updated by the server events
        // no need to manually update local state here
    }

    public hideRoomOverlays(): void {
        // hide room overlays when post drill overlay is shown
        this.updateRoomState({
            showRoomOverlay: false,
            showRoomModeOverlay: false
        });
    }
}
