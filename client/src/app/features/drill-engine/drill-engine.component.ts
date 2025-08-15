// === drill-engine.component.ts ===
import { Component, NgZone, OnInit, ViewChild, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DrillTextComponent } from './drill-text/drill-text.component';
import { DrillInputComponent } from './drill-input/drill-input.component';
import { SpecialKeys } from '../../core/constants/keys.constant';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../models/enums/drill-length.enum';
import { DrillStatistic } from '../../models/interfaces/drill-stats.interface';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { DrillToolbarComponent } from './drill-toolbar/drill-toolbar.component';
import { RoomSettingsToolbarComponent } from './room-settings-toolbar/room-settings-toolbar.component';
import { AdaptiveDrillModalComponent } from './adaptive-drill-modal/adaptive-drill-modal.component';
import { PlayerPanelComponent, Player } from './player-panel/player-panel.component';
import { CountdownOverlayComponent } from './overlays/countdown-overlay/countdown-overlay.component';
import { CompetitivePostDrillOverlayComponent } from './overlays/competitive-post-drill-overlay/competitive-post-drill-overlay.component';

import { ThemeService } from '../../services/theme.service';
import { NavigationService } from '../navigation/navigation.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DrillPreference } from '../../models/interfaces/drill-preference.interface';
import { DrillType } from '../../models/enums/drill-type.enum';
import { ZorroNotificationServiceTsService } from '../../shared/zorro-notification.service.ts.service';
import { AdaptiveService } from '../../services/adaptive.service';
import { DrillStatisticsService } from '../../services/drill-statistics.service';
import { DrillSubmissionService } from '../../services/drill-submission.service';
import { TimerManagementService, TimerState } from '../../services/timer-management.service';
import { DrillStateManagementService } from '../../services/drill-state-management.service';
import { RealTimeDataService } from '../../services/real-time-data.service';
import { DrillSubmissionRequest } from '../../models/interfaces/drill-submission.interface';
import { SignalRService } from '../../services/signalr.service';

import { CompetitiveDrillService, RoomState } from '../../services/competitive-drill.service';
import { JwtDecoderUtil } from '../../core/utils/jwt-decoder.util';
import { BookService } from '../../services/book.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-drill-engine',
    standalone: true,
    imports: [
        CommonModule,
        DrillTextComponent,
        DrillInputComponent,
        VirtualKeyboardComponent,
        DrillToolbarComponent,
        RoomSettingsToolbarComponent,
        AdaptiveDrillModalComponent,
        PlayerPanelComponent,
        CountdownOverlayComponent,
        CompetitivePostDrillOverlayComponent,
        NzCardModule,
        NzButtonModule,
        NzModalModule,
        NzTagModule
    ],
    providers: [BookService],
    templateUrl: './drill-engine.component.html',
    styleUrl: './drill-engine.component.scss',
})
export class DrillEngineComponent implements OnInit, OnDestroy {
    @Input() isCompetitive: boolean = false;
    @ViewChild(DrillInputComponent) drillInputComponent!: DrillInputComponent;


    // timer state will be managed by TimerManagementService
    timerState: TimerState | null = null;
    // real-time data collection is now managed by RealTimeDataService

    // wpm and accuracy
    wpm: number = 0;
    accuracy: number = 100;

    isDarkMode: boolean = false;

    // drill preference
    drillPreferences: DrillPreference;

    // drill type from navigation
    currentDrillType: DrillType = DrillType.Timed;

    // typing state for toolbar animation
    private typingTimeout: any;

    // afk protection and inactivity detection
    private lastActivityTime: number = 0;
    public isUserInactive: boolean = false;
    public hasBeenInactive: boolean = false;
    private inactivityTimeout: any;
    private readonly MAX_INACTIVITY_SECONDS = 10;

    private readonly INACTIVITY_CHECK_INTERVAL = 10000;
    private inactivityCheckInterval: any;
    public afkReason: string = '';

    // competitive
    public roomState: RoomState = {
        showRoomOverlay: false,
        showRoomModeOverlay: false,
        roomCode: '',
        userRole: 'Member',
        roomState: 'Waiting',
        isCreatingRoom: false,
        isJoiningRoom: false
    };

    // player panel data
    public players: Player[] = [];
    public currentUserId: string = '';
    public isCurrentUserReady: boolean = false;
    public playerWordsCompleted: { [userId: string]: number } = {};

    // countdown state
    public showCountdown: boolean = false;
    public countdownValue: number = 0;
    public isCountdownBegin: boolean = false;
    private countdownInProgress: boolean = false;
    private countdownHideTimeout: any = null;

    // competitive stats push interval
    private statsInterval: any;

    // winner message displayed
    public winnerMessage: string = '';
    public showCompetitivePostDrillOverlay: boolean = false;
    public competitiveWinnerUsername: string = '';
    public showCompetitivePostDrillResults: boolean = false; // Track if we should show drill results
    private continuedPlayers: Set<string> = new Set<string>(); // Track which players have continued
    private drillResultsData: { [userId: string]: any } = {}; // Store drill results data for each player
    private afkPlayers: Set<string> = new Set<string>();
    private subscriptions: Subscription[] = [];
    
    // book progress tracking for classics
    private currentBookId: string | null = null;
    private progressSaveInterval: any;
    private readonly PROGRESS_SAVE_INTERVAL = 30000; // Save every 30 seconds


    constructor(
        public adaptiveService: AdaptiveService,
        private drillStatisticsService: DrillStatisticsService,
        private drillSubmissionService: DrillSubmissionService,
        private timerManagementService: TimerManagementService,
        private drillStateManagementService: DrillStateManagementService,
        private realTimeDataService: RealTimeDataService,
        private ngZone: NgZone,
        private themeService: ThemeService,
        private navigationService: NavigationService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: ZorroNotificationServiceTsService,
        private signalRService: SignalRService,
        private competitiveDrillService: CompetitiveDrillService,
        private http: HttpClient,
        private bookService: BookService
    ) {
        // get drill preference
        let storedPreference: DrillPreference = JSON.parse(localStorage.getItem('drillPreference') ?? '{}');

        // if no preference set, set default preference
        if (Object.keys(storedPreference).length === 0) {
            const defaultPreference: DrillPreference = {
                drillType: DrillType.Timed,
                drillDifficulty: DrillDifficulty.Intermediate,
                drillLength: DrillLength.Medium,
                drillDuration: 30
            };

            localStorage.setItem('drillPreference', JSON.stringify(defaultPreference));

            storedPreference = defaultPreference;
        }

        this.drillPreferences = storedPreference;

        // initialize current drill type from stored preferences
        this.currentDrillType = this.drillPreferences.drillType || DrillType.Timed;
    }

    ngOnInit(): void {
        // check if this is competitive mode from route data
        this.route.data.subscribe(data => {
            if (data['isCompetitive']) {
                this.isCompetitive = true;
            }
        });



        // set initial drill type from preferences
        this.navigationService.setCurrentDrillType(this.currentDrillType);

        this.resetDrillStats();

        this.timerManagementService.getTimerState().subscribe(timerState => {
            this.timerState = timerState;
        });

        this.adaptiveService.getAdaptiveState().subscribe(adaptiveState => {});

        this.drillStateManagementService.getDrillState().subscribe(drillState => {});

        // get drill type from url query parameters
        this.route.queryParams.subscribe(params => {
            const drillType = params['type'];
            const bookId = params['bookId'];
            const source = params['source'];
            const restart = params['restart'];

            if (drillType && Object.values(DrillType).includes(drillType)) {
                this.currentDrillType = drillType as DrillType;
                this.navigationService.setCurrentDrillType(this.currentDrillType);

                // update drill preferences with new drill type and save to localStorage
                this.drillPreferences.drillType = this.currentDrillType;

                localStorage.setItem('drillPreference', JSON.stringify(this.drillPreferences));

                // handle classics source - just set drill type to Marathon, onNewDrill will handle the rest
                if (source === 'classics' && bookId) {
                    this.drillPreferences.drillType = DrillType.Marathon;
                    this.currentDrillType = DrillType.Marathon;
                    this.navigationService.setCurrentDrillType(this.currentDrillType);
                    localStorage.setItem('drillPreference', JSON.stringify(this.drillPreferences));
                }
                
                this.onNewDrill();
            } else if (!drillType) {
                // if no drill type in url, start with current drill type from preferences
                this.onNewDrill();
            }
        });

        this.themeService.getDarkMode().subscribe(isDark => {
            this.isDarkMode = isDark;
        });

        // listen for route changes to save progress when navigating away
        this.router.events.subscribe(event => {
            if (event.type === 1) { // NavigationStart
                // save progress when navigating away from classics
                if (this.currentBookId && this.sourceText.length > 0) {
                    const totalWordCount = this.sourceText.length;
                    const typedWordCount = this.currentWordIndex;
                    const isCompleted = typedWordCount >= totalWordCount;
                    
                    this.bookService.saveBookProgress(
                        this.currentBookId,
                        typedWordCount,
                        totalWordCount,
                        isCompleted
                    ).subscribe({
                        next: (progress) => {
                            console.log('Book progress saved on navigation:', progress);
                            // trigger progress refresh for classics component
                            this.bookService.triggerProgressRefresh();
                        },
                        error: (error) => {
                            console.error('Failed to save book progress on navigation:', error);
                        }
                    });
                }
            }
        });

        // listen for window beforeunload to save progress when closing browser tab
        window.addEventListener('beforeunload', () => {
            if (this.currentBookId && this.sourceText.length > 0) {
                const totalWordCount = this.sourceText.length;
                const typedWordCount = this.currentWordIndex;
                const isCompleted = typedWordCount >= totalWordCount;
                
                // use synchronous XMLHttpRequest for beforeunload
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${environment.apiBaseUrl}/profile/update-book-progress`, false); // synchronous
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                
                const progressData = {
                    bookId: this.currentBookId,
                    completedWords: typedWordCount,
                    isCompleted: isCompleted
                };
                
                try {
                    xhr.send(JSON.stringify(progressData));
                    console.log('Book progress saved on page close');
                } catch (error) {
                    console.error('Failed to save book progress on page close:', error);
                }
            }
        });

        // check for active room session if in competitive mode
        if (this.isCompetitive) {
            this.competitiveDrillService.initializeCompetitiveMode();
            
            // subscribe to room state changes
            this.competitiveDrillService.roomState$.subscribe(roomState => {
                this.roomState = roomState;
                
                // override local preferences with room settings in competitive mode
                const competitivePreferences = this.competitiveDrillService.getCompetitiveDrillPreferences();
                if (competitivePreferences) {
                    this.drillPreferences = competitivePreferences;
                    this.currentDrillType = competitivePreferences.drillType;
                    // console.log('Using competitive drill preferences:', competitivePreferences);
                }
            });

            // subscribe to players data
            this.competitiveDrillService.players$.subscribe(signalRPlayers => {
                const updatedPlayers = signalRPlayers.map(player => {
                    let basePlayer: Player;
                    if (this.drillResultsData[player.userId]) {
                        const drillData = this.drillResultsData[player.userId];
                        basePlayer = {
                            userId: player.userId,
                            username: player.username,
                            level: player.level,
                            state: player.state,
                            isReady: player.state === 'Ready',
                            isCreator: player.isCreator || false,
                            isAFK: this.afkPlayers.has(player.userId),
                            wpm: drillData.wpm,
                            accuracy: drillData.accuracy,
                            progress: drillData.progress ?? player.statistics?.completionPercentage
                        };
                    }
                    else {
                        basePlayer = {
                            userId: player.userId,
                            username: player.username,
                            level: player.level,
                            state: player.state,
                            isReady: player.state === 'Ready',
                            isCreator: player.isCreator || false,
                            progress: player.statistics?.completionPercentage ?? this.drillResultsData[player.userId]?.progress,
                            wpm: player.statistics?.wpm,
                            accuracy: player.statistics?.accuracy,
                            isAFK: this.afkPlayers.has(player.userId)
                        };
                    }

                    
                    // simple logic: if this player hasn't continued and we have drill results, preserve the drill data
                    if (!this.continuedPlayers.has(player.userId) && this.drillResultsData[player.userId]) {
                        const drillData = this.drillResultsData[player.userId];
                        return {
                            ...basePlayer,
                            wpm: drillData.wpm,
                            accuracy: drillData.accuracy,
                            progress: drillData.progress,
                            state: 'Finished' as const
                        };
                    }
                    
                    return basePlayer;
                });
                
                // update players array with the merged data
                this.players = updatedPlayers;
                
                // update current user ready state
                const currentPlayer = signalRPlayers.find(p => p.userId === this.currentUserId);
                this.isCurrentUserReady = currentPlayer?.state === 'Ready';
            });

            // subscribe to real-time player statistics updates (progress for marathon)
            this.signalRService.onPlayerStatisticsUpdate$.subscribe(({ roomId, statistics }) => {
                if (!statistics || statistics.length === 0) return;
                const statsByUser = new Map<string, any>();
                statistics.forEach(s => statsByUser.set(s.userId, s));
                
                // update words completed tracking for timed drill relative progress
                statistics.forEach(stat => {
                    const wordsCompleted = stat.wordsCompleted as number | undefined;
                    if (wordsCompleted !== undefined) {
                        this.playerWordsCompleted[stat.userId] = wordsCompleted;
                    }
                });
                
                // only update players if there are actual changes to avoid excessive ngOnChanges calls
                let hasChanges = false;
                const updatedPlayers = this.players.map(p => {
                    const stat = statsByUser.get(p.userId);
                    if (!stat) return p;
                    
                    const completion = (stat.completionPercentage ?? stat.CompletionPercentage ?? stat.completionpercentage) as number | undefined;
                    const wpm = (stat.wpm ?? stat.WPM) as number | undefined;
                    const accuracy = (stat.accuracy ?? stat.Accuracy) as number | undefined;
                    
                    // check if any values actually changed
                    if (p.progress !== completion || p.wpm !== wpm || p.accuracy !== accuracy) {
                        hasChanges = true;
                        return {
                            ...p,
                            progress: completion,
                            wpm: wpm,
                            accuracy: accuracy
                        };
                    }
                    return p;
                });
                
                // only update the players array if there were actual changes
                if (hasChanges) {
                    this.players = updatedPlayers;
                }
            });

            // subscribe to AFK events
            this.signalRService.onPlayerAFK$.subscribe(({ roomId, playerId }) => {
                this.afkPlayers.add(playerId);
                this.players = this.players.map(p => p.userId === playerId ? { ...p, isAFK: true } : p);
            });

            // subscribe to AFK warning events
            this.signalRService.onAFKWarning$.subscribe(({ roomId, playerId, timeoutSeconds }) => {
                // console.log(`DRILL ENGINE: AFK warning for player ${playerId}, timeout: ${timeoutSeconds}s`);
                // show AFK warning overlay for the current user if they are the one being warned
                if (playerId === this.currentUserId) {
                    this.afkReason = `You will be marked as AFK in ${timeoutSeconds} seconds if you don't start typing`;
                    // you could show a notification or overlay here
                }
            });

            // subscribe to waiting for other players events
            this.signalRService.onWaitingForOtherPlayers$.subscribe(({ finishedCount, totalCount }) => {
                // console.log(`DRILL ENGINE: Waiting for other players - finished: ${finishedCount}, total: ${totalCount}`);
                // update UI to show waiting state
                this.winnerMessage = `Waiting for ${totalCount - finishedCount} more player(s) to finish...`;
            });

            // subscribe to all players completed events
            this.signalRService.onAllPlayersCompleted$.subscribe(({ roomId }) => {
                // console.log(`DRILL ENGINE: All players completed drill in room ${roomId}`);
                // this event indicates all players have finished the drill
                // the EndDrill event will follow shortly
            });

            // subscribe to player kicked events
            this.signalRService.onPlayerKicked$.subscribe(({ roomCode, reason }) => {
                // console.log(`DRILL ENGINE: Player kicked from room ${roomCode}, reason: ${reason}`);
                // if the current user is kicked, handle accordingly
                if (roomCode === this.roomState.roomCode) {
                                          // show notification and redirect
                    this.notificationService.createNotification('error', 'Kicked from Room', reason);
                    this.onLeaveRoom();
                }
            });

            // subscribe to countdown events
            this.signalRService.onCountdown$.subscribe(({ roomId, countdown }) => {
                // console.log(`DRILL ENGINE: Countdown event received - roomId: ${roomId}, countdown: ${countdown}`);

                // show/update countdown every tick
                this.showCountdown = true;
                this.countdownValue = countdown;
                this.isCountdownBegin = countdown === 0;

                // mark countdown sequence start
                if (countdown === 3) {
                    this.countdownInProgress = true;
                }

                // clear any pending hide to avoid flicker across ticks
                if (this.countdownHideTimeout) {
                    clearTimeout(this.countdownHideTimeout);
                    this.countdownHideTimeout = null;
                }

                // only hide after showing BEGIN for 1s
                if (countdown === 0) {
                    this.countdownHideTimeout = setTimeout(() => {
                        this.showCountdown = false;
                        this.countdownInProgress = false;
                        this.countdownHideTimeout = null;
                    }, 1000);
                }
            });

            // subscribe to competitive drill text (authoritative list of words from server)
            this.competitiveDrillService.drillText$.subscribe(drillText => {
                if (drillText.length > 0) {
                    // console.log(`DRILL ENGINE: Received drill text from competitive service`);
                    // start using provided words to ensure all clients have identical text
                    this.drillStateManagementService.startDrillWithProvidedWords(drillText);
                    // start timer for competitive drill
                    this.startTimer();
                    // begin pushing stats
                    if (this.statsInterval) {
                        clearInterval(this.statsInterval);
                    }
                    this.statsInterval = setInterval(() => {
                        try {
                            const totalWords = this.sourceText.length;
                            const wordsCompleted = Math.min(this.currentWordIndex, totalWords);
                            const completion = totalWords > 0 ? Math.round((wordsCompleted / totalWords) * 100) : 0;
                            this.signalRService.updatePlayerStatistics(this.roomState.roomCode, {
                                userId: this.currentUserId,
                                wpm: this.wpm,
                                accuracy: this.accuracy,
                                wordsCompleted: wordsCompleted,
                                totalWords: totalWords,
                                completionPercentage: completion,
                                timestamp: new Date()
                            } as any).catch(() => {});
                        } catch {}
                    }, 750); // Optimized: 750ms for better balance between smoothness and performance
                    // focus input shortly after
                    setTimeout(() => this.focusInput(), 100);
                }
            });

            // subscribe to server EndDrill event to finalize UI
            this.signalRService.onEndDrill$.subscribe(({ roomId, results }) => {
                this.stopDrill();
                if (this.statsInterval) {
                    clearInterval(this.statsInterval);
                    this.statsInterval = null;
                }
                
                // Handle competitive drill completion
                if (this.isCompetitive) {
                    const winner = results?.playerResults?.find((p: any) => p.isWinner);
                    this.competitiveWinnerUsername = winner ? winner.username : '';
                    this.showCompetitivePostDrillOverlay = true;
                    this.showCompetitivePostDrillResults = true; // Show drill results in player panel
                    
                    // Hide room overlays when post drill overlay is shown
                    this.competitiveDrillService.hideRoomOverlays();
                    
                    // Clear previous drill results data
                    this.drillResultsData = {};
                    // Store drill results data for each player
                    this.drillResultsData = {};
                    results?.playerResults?.forEach((playerResult: any) => {
                        this.drillResultsData[playerResult.userId] = {
                            wpm: playerResult.wpm,
                            accuracy: playerResult.accuracy,
                            position: playerResult.position,
                            pointsChange: playerResult.pointsChange,
                            progress: playerResult.progress // Ensure completed drills show 100% progress
                        };
                    });
                    // Update room state to Finished
                    this.roomState.roomState = 'Finished';
                } else {
                    // Handle regular drill completion
                    const winner = results?.playerResults?.find((p: any) => p.isWinner);
                    this.winnerMessage = winner ? `${winner.username} wins!` : '';
                }
            });

            // Subscribe to drill start to reset continued players and drill results
            const startDrillSubscription = this.signalRService.onStartDrill$.subscribe(({ roomId, drillText }) => {
                if (this.isCompetitive) {
                    // Reset continued players and drill results when new drill starts
                    this.continuedPlayers.clear();
                    this.drillResultsData = {};
                    this.showCompetitivePostDrillResults = false;
                }
            });
            this.subscriptions.push(startDrillSubscription);

            // get current user ID from JWT token
            const token = localStorage.getItem('accessToken') || '';
            this.currentUserId = JwtDecoderUtil.getUserId(token) || '';
        }
    }

    startDrill(adaptiveWords: string[] = [], bookContent?: string): void {
        this.drillStateManagementService.startDrill(adaptiveWords, this.drillPreferences, bookContent);
    }

    stopDrill(isAdaptive: boolean = false): void {
        this.stopTimer();

        this.stopInactivityMonitoring();

        if (this.statsInterval) {
            clearInterval(this.statsInterval);
            this.statsInterval = null;
        }

        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        if (currentTimerState.startTime > 0) {
            const finalTimePoint = this.drillPreferences.drillType === DrillType.Timed
                ? currentTimerState.totalTimeInSeconds
                : Math.floor((Date.now() - currentTimerState.startTime) / 1000);
            this.realTimeDataService.addTimeSeriesDataPoint(finalTimePoint, this.wpm, this.accuracy);
        }

        // update drill statistic with final data
        const updatedDrillStatistic = { ...this.drillStatistic };
        updatedDrillStatistic.realTimeData = [...this.realTimeDataService.getRealTimeData()];
        updatedDrillStatistic.wpm = this.wpm;
        updatedDrillStatistic.accuracy = this.accuracy;

        updatedDrillStatistic.avgWPM = updatedDrillStatistic.realTimeData.length > 0
            ? updatedDrillStatistic.realTimeData.reduce((acc, curr) => acc + curr.wpm, 0) / updatedDrillStatistic.realTimeData.length
            : 0;

        updatedDrillStatistic.avgAccuracy = updatedDrillStatistic.realTimeData.length > 0
            ? updatedDrillStatistic.realTimeData.reduce((acc, curr) => acc + curr.accuracy, 0) / updatedDrillStatistic.realTimeData.length
            : 100;

        updatedDrillStatistic.maxWPM = updatedDrillStatistic.realTimeData.reduce((acc, curr) => Math.max(acc, curr.wpm), 0);
        updatedDrillStatistic.maxAccuracy = updatedDrillStatistic.realTimeData.reduce((acc, curr) => Math.max(acc, curr.accuracy), 0);

        updatedDrillStatistic.wordsCount = updatedDrillStatistic.correctWords + updatedDrillStatistic.incorrectWords;
        updatedDrillStatistic.lettersCount = updatedDrillStatistic.correctLetters + updatedDrillStatistic.incorrectLetters;

        updatedDrillStatistic.errorRate = updatedDrillStatistic.wordsCount > 0
            ? (updatedDrillStatistic.incorrectWords / updatedDrillStatistic.wordsCount) * 100
            : 0;

        this.drillStateManagementService.updateDrillStatistic(updatedDrillStatistic);
        this.drillStateManagementService.stopDrill(isAdaptive);
    }

    onKeyTyped(value: string): void {

        if (value === 'CTRL_BACKSPACE') {
            this.clearCurrentWord();
            return;
        } else if (value === 'ESCAPE') {
            this.drillInputComponent.blurInput();
            return;
        }

        if (value === SpecialKeys.Backspace.toString()) {
            this.handleBackspace();
            return;
        }

        // Handle Enter key for line breaks
        if (value === 'Enter') {
            const currentWord = this.sourceText[this.currentWordIndex];
            if (currentWord && currentWord[0] === '↵') {
                // User pressed Enter on a line break character - mark it as completed and advance
                const updatedTypedText = [...this.typedText];
                // The source text for line break is ['↵'], so we need to match that structure
                updatedTypedText[this.currentWordIndex] = [{
                    key: '↵',
                    correct: true
                }];
                this.drillStateManagementService.updateTypedText(updatedTypedText);
                
                // Mark word as locked (completed)
                this.wordLocked[this.currentWordIndex] = true;
                
                // Advance to next word
                this.drillInputComponent.clearDrillInput();
                this.drillStateManagementService.updateIndices(this.currentWordIndex + 1, 0);
                
                // Check if we need to load the next chunk
                this.drillStateManagementService.loadNextChunkIfNeeded(this.currentWordIndex + 1);
                return;
            }
        }

        this.updateUserActivity();

        // set typing state for toolbar animation
        this.setTypingState(true);

        // start timer on first keystroke
        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        if (!currentTimerState.startTime) this.startTimer();

        const currentWord = this.sourceText[this.currentWordIndex];

        const expectedChar = currentWord[this.currentCharIndex];
        const enteredChar = value;

        const isCharCorrect = expectedChar === enteredChar;

        if (isCharCorrect) {
            this.drillStatistic.correctLetters++;
        } else {
            this.drillStatistic.incorrectLetters++;
        }

        // build char error map
        if (!isCharCorrect) {
            this.drillStatistic.errorMap.charErrorMap[expectedChar] ??= 0;
            this.drillStatistic.errorMap.charErrorMap[expectedChar]++;
        }

        if (this.currentCharIndex >= currentWord.length) return;

        // construct typedtext array for input to drilltext component
        const updatedTypedText = [...this.typedText];
        updatedTypedText[this.currentWordIndex][this.currentCharIndex] = {
            key: value,
            correct: isCharCorrect,
        };

        this.drillStateManagementService.updateTypedText(updatedTypedText);
        this.drillStateManagementService.updateIndices(this.currentWordIndex, this.currentCharIndex + 1);

        // word complete
        if (this.currentCharIndex === currentWord.length) {
            const isWordCorrect = this.typedText[this.currentWordIndex].every(
                (stroke, i) =>
                    stroke?.key === this.sourceText[this.currentWordIndex][i],
            );

            // build word error map
            if (!isWordCorrect) {
                const currentWordTrimmed = currentWord.join('').trim();
                this.drillStatistic.errorMap.wordErrorMap[currentWordTrimmed] ??= 0;
                this.drillStatistic.errorMap.wordErrorMap[currentWordTrimmed]++;
                this.drillStatistic.incorrectWords++;
                this.realTimeDataService.addWordIncorrectThisSecond(this.currentWordIndex);
            } else {
                this.drillStatistic.correctWords++;
                this.realTimeDataService.addWordCompletedThisSecond(this.currentWordIndex);
            }

            // do not let user modify the completed correct words
            this.wordLocked[this.currentWordIndex] = isWordCorrect;

            this.drillInputComponent.clearDrillInput();
            this.drillStateManagementService.updateIndices(this.currentWordIndex + 1, 0);

            // Check if we need to load the next chunk for book content
            this.drillStateManagementService.loadNextChunkIfNeeded(this.currentWordIndex + 1);

            if (this.currentWordIndex >= this.sourceText.length) {
                // Send final stats with 100% completion before stopping drill
                if (this.isCompetitive && this.roomState.roomCode) {
                    const totalWords = this.sourceText.length;
                    
                    // Send final statistics update
                    this.signalRService.updatePlayerStatistics(this.roomState.roomCode, {
                        userId: this.currentUserId,
                        wpm: this.wpm,
                        accuracy: this.accuracy,
                        wordsCompleted: totalWords,
                        totalWords: totalWords,
                        completionPercentage: 100,
                        timestamp: new Date()
                    } as any).catch(() => {});
                    
                    // Call CompleteDrill to notify server that this player has finished
                    const drillResult = {
                        userId: this.currentUserId,
                        wpm: this.wpm,
                        accuracy: this.accuracy,
                        wordsCompleted: totalWords,
                        totalWords: totalWords,
                        completionPercentage: 100,
                        position: 0,
                        pointsChange: 0,
                        finishedAt: new Date()
                    };
                    
                    this.signalRService.completeDrill(this.roomState.roomCode, drillResult).catch((error) => {
                        console.error('Error completing drill:', error);
                    });
                }
                this.stopDrill();
                return;
            }
        }
    }

    clearCurrentWord(): void {
        // beginning of the word and it's not the first word
        if (this.currentCharIndex === 0 && this.currentWordIndex > 0) {
            const prevIndex = this.currentWordIndex - 1;

            // cannot clear locked word
            if (this.wordLocked[prevIndex]) {
                return;
            }

            const length = this.sourceText[prevIndex].length;
            const updatedTypedText = [...this.typedText];
            updatedTypedText[prevIndex] = new Array(length).fill(undefined);
            this.drillStateManagementService.updateTypedText(updatedTypedText);
            this.drillStateManagementService.updateIndices(prevIndex, 0);
            this.drillInputComponent.clearDrillInput();
            return;
        }

        if (this.wordLocked[this.currentWordIndex]) return;

        // clear current word if not locked
        const wordLength = this.sourceText[this.currentWordIndex]?.length ?? 0;

        // clear typed state for current word
        const updatedTypedText = [...this.typedText];
        updatedTypedText[this.currentWordIndex] = new Array(wordLength).fill(
            undefined,
        );

        this.drillStateManagementService.updateTypedText(updatedTypedText);
        this.drillStateManagementService.updateIndices(this.currentWordIndex, 0);
        this.drillInputComponent.clearDrillInput();
    }

    handleBackspace(): void {
        if (this.currentCharIndex === 0) {
            if (this.currentWordIndex === 0) return;

            // move to previous word
            const prevIndex = this.currentWordIndex - 1;

            // cannot backtrack to a locked word
            if (this.wordLocked[prevIndex]) return;

            this.drillStateManagementService.updateIndices(prevIndex, this.sourceText[prevIndex].length);
        }

        // only increment corrections if we're actually moving the cursor back
        // and there's a character to delete (not at the beginning of the word)
        if (this.currentCharIndex > 0) {
            const newCharIndex = this.currentCharIndex - 1;
            const updatedTypedText = [...this.typedText];
            updatedTypedText[this.currentWordIndex][newCharIndex] = undefined;
            this.drillStateManagementService.updateTypedText(updatedTypedText);
            this.drillStateManagementService.updateIndices(this.currentWordIndex, newCharIndex);
            
            // increment total corrections
            const updatedDrillStatistic = { ...this.drillStatistic };
            updatedDrillStatistic.totalCorrections++;
            this.drillStateManagementService.updateDrillStatistic(updatedDrillStatistic);
            this.realTimeDataService.incrementCorrectionsThisSecond();
        }
    }

    updateWPMAndAccuracy(): void {
        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        const result = this.drillStatisticsService.updateWPMAndAccuracy(this.typedText, currentTimerState.startTime);
        this.wpm = result.wpm;
        this.accuracy = result.accuracy;
    }

    startTimer(): void {
        this.realTimeDataService.addTimeSeriesDataPoint(0, this.wpm, this.accuracy);

        if (this.drillPreferences.drillType !== DrillType.Timed) {
            this.startInactivityMonitoring();
        }

        this.timerManagementService.startTimer(this.drillPreferences, {
            onTick: (timerState: TimerState) => {
                this.timerState = timerState;
                this.updateWPMAndAccuracy();

                // add time series data point
                if (this.drillPreferences.drillType === DrillType.Timed) {
                    const currentTimePoint = timerState.totalTimeInSeconds - timerState.remainingSeconds;
                    this.realTimeDataService.addTimeSeriesDataPoint(currentTimePoint, this.wpm, this.accuracy);
            } else {
                // only add data points if user is active or within reasonable inactivity period
                    if (!this.isUserInactive || timerState.elapsedSeconds <= this.MAX_INACTIVITY_SECONDS) {
                        this.realTimeDataService.addTimeSeriesDataPoint(timerState.elapsedSeconds, this.wpm, this.accuracy);
                    }
                }
            },
            onTimeout: () => {
                this.stopDrill();
            },
            onMaxDurationReached: () => {
                    this.stopDrill();
                }
        });
    }

    stopTimer(): void {
        this.timerManagementService.stopTimer();
        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        if (this.drillStatistic && currentTimerState.startTime) {
            this.drillStatistic.duration = Math.floor((Date.now() - currentTimerState.startTime) / 1000);
        }
    }

    focusInput() {
        this.drillInputComponent?.focusInput();
    }

    onInputFocus(): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.drillStateManagementService.setInputFocusState(true);
                });
            });
        });
    }

    onInputBlur(): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.drillStateManagementService.setInputFocusState(false);
                });
            });
        });
    }

    handleVirtualKeyPress = (button: string) => {
        this.onKeyTyped(button);
        this.drillStateManagementService.setCurrentInput(this.currentInput + button);
    };

    // toolbar event handlers
    onRestart(): void {
        this.stopDrill();
        this.resetDrillStats();
        this.drillStateManagementService.restartDrill();
        this.focusInput();
    }

    onNewDrill(): void {
        this.resetDrillStats();
        this.adaptiveService.resetAdaptiveState();
        this.drillStateManagementService.resetDrillStats(this.drillPreferences);

        this.stopInactivityMonitoring();

        this.stopTimer();

        // handle competitive mode differently - no drill should be active yet
        if (this.isCompetitive) {
            this.onNewCompetitiveDrill();
        }
        // only focus input after word generation is complete for adaptive drills
        else if (this.drillPreferences.drillType === DrillType.Adaptive) {
            this.onNewAdaptiveDrill();
        }
        // handle classics - load book content and start marathon drill
        else if (this.drillPreferences.drillType === DrillType.Marathon && this.route.snapshot.queryParams['source'] === 'classics') {
            this.loadClassicsBook();
        }
        else {
            this.drillStateManagementService.setInputFocusState(true);

            // start fresh drill
            this.startDrill();
            this.focusInput();
        }
    }

    onNewCompetitiveDrill(): void {
        this.signalRService.connect().then(() => {
            this.competitiveDrillService.initializeCompetitiveMode();
        }).catch((error: any) => {
            console.error('Failed to connect to SignalR:', error);
            this.competitiveDrillService.initializeCompetitiveMode();
        });
    }

    onNewAdaptiveDrill(): void {
        if (this.sourceText.length === 0) {
            this.fillRandomDrillText();
        }
        this.adaptiveService.showAdaptiveDrillOverlay();
    }

    private loadClassicsBook(): void {
        const bookId = this.route.snapshot.queryParams['bookId'];
        const restart = this.route.snapshot.queryParams['restart'];
        
        if (!bookId) {
            console.error('No book ID provided for classics');
            this.startDrill();
            return;
        }

        // Store book ID for progress tracking
        this.currentBookId = bookId;

        // Import BookService dynamically to avoid circular dependency
        import('../../services/book.service').then(({ BookService }) => {
            const bookService = new BookService(this.http);
            bookService.getBookById(bookId).subscribe({
                next: (book) => {
                    if (book) {
                        this.drillStateManagementService.setInputFocusState(true);
                        
                        // Handle restart - reset book progress
                        if (restart === 'true') {
                            bookService.resetBook(bookId).subscribe({
                                next: (success) => {
                                    console.log('Book progress reset:', success);
                                },
                                error: (error) => {
                                    console.error('Failed to reset book progress:', error);
                                }
                            });
                        } else {
                            // Start book progress tracking (creates entry if doesn't exist)
                            bookService.startBook(bookId, book.totalWordCount).subscribe({
                                next: (success) => {
                                    console.log('Book progress started:', success);
                                },
                                error: (error) => {
                                    console.error('Failed to start book progress:', error);
                                }
                            });
                        }
                        
                        // Start drill with book content
                        this.startDrill([], book.content);
                        this.focusInput();
                        
                        // Start progress saving for classics
                        this.startProgressSaving(book.totalWordCount);
                    } else {
                        console.error('Book not found:', bookId);
                        // Fallback to random drill text
                        this.startDrill();
                        this.focusInput();
                    }
                },
                error: (error) => {
                    console.error('Error loading book:', error);
                    // Fallback to random drill text
                    this.startDrill();
                    this.focusInput();
                }
            });
        });
    }

    private startProgressSaving(totalWordCount: number): void {
        if (!this.currentBookId) return;
        
        // Save progress immediately when starting
        this.saveBookProgress(totalWordCount);
        
        // No longer set up periodic saving - will save on navigation/exit
    }

    private stopProgressSaving(): void {
        // No interval to clear anymore
        // Final save will be called in ngOnDestroy
    }

    private saveBookProgress(totalWordCount: number): void {
        if (!this.currentBookId) return;
        
        const typedWordCount = this.currentWordIndex;
        const isCompleted = typedWordCount >= totalWordCount;
        
        this.bookService.saveBookProgress(
            this.currentBookId, 
            typedWordCount, 
            totalWordCount, 
            isCompleted
        ).subscribe({
            next: (progress) => {
                console.log('Book progress saved:', progress);
                // Trigger progress refresh for classics component
                this.bookService.triggerProgressRefresh();
            },
            error: (error) => {
                console.error('Failed to save book progress:', error);
            }
        });
    }



    onViewErrorWords(): void {
        this.adaptiveService.showErrorWordsModal();
    }

    onViewErrorProneWords(settings?: {difficulty: DrillDifficulty, length: DrillLength}): void {
        // create a temporary drill preferences object with the selected settings
        const tempPreferences = { ...this.drillPreferences };
        if (settings) {
            tempPreferences.drillDifficulty = settings.difficulty;
            tempPreferences.drillLength = settings.length;
        }
        
        this.adaptiveService.loadErrorProneWords(tempPreferences);
    }

    onChangePreference(): void {
        if (this.isDrillActive) {
            this.stopDrill(true);
        }
        
        this.resetDrillStats();
        
        this.adaptiveService.showAdaptiveDrillOverlay();
    }

    onLeaveRoom(): void {
        this.competitiveDrillService.leaveRoom();
    }

    onStartCompetitiveDrill(): void {
        this.competitiveDrillService.startDrill().catch((err: any) => {
            const message = (err && err.message) ? err.message : 'Failed to start drill';
            this.notificationService.createNotification('error', 'Cannot start drill', message);
        });
    }

    // startCompetitiveDrill removed; use startDrillWithProvidedWords via subscription above

    onSetReady(): void {
        this.competitiveDrillService.toggleReady();
    }

    onKickPlayer(userId: string): void {
        if (!this.isCompetitive || this.roomState.userRole !== 'Creator') return;
        this.signalRService.kickPlayer(this.roomState.roomCode, userId).catch(() => {});
    }

    async onCompetitivePostDrillContinue(): Promise<void> {
        this.showCompetitivePostDrillOverlay = false;
        // Mark current user as continued
        this.continuedPlayers.add(this.currentUserId);
        // Reset room state to waiting and return to lobby
        await this.competitiveDrillService.resetRoomToWaiting();
        // Update local state to match service state
        this.roomState = this.competitiveDrillService.getCurrentRoomState();
        // Map SignalR Player to player panel Player interface
        const signalRPlayers = this.competitiveDrillService.getCurrentPlayers();
        this.players = signalRPlayers.map(player => {
            const basePlayer = {
                ...player,
                isReady: player.state === 'Ready',
                isCreator: player.isCreator || false
            };
            
            // If this player hasn't continued and we have drill results for them, preserve the drill data
            if (!this.continuedPlayers.has(player.userId) && this.drillResultsData[player.userId]) {
                const drillData = this.drillResultsData[player.userId];
                return {
                    ...basePlayer,
                    wpm: drillData.wpm,
                    accuracy: drillData.accuracy,
                    progress: drillData.progress,
                    state: 'Finished' as const
                };
            }
            
            return basePlayer;
        });
        this.isCurrentUserReady = false;
    }

    onCompetitivePostDrillLeaveRoom(): void {
        this.showCompetitivePostDrillOverlay = false;
        this.showCompetitivePostDrillResults = false; // Hide drill results when leaving room
        this.drillResultsData = {}; // Clear drill results data
        
        // Ensure room overlays are hidden when leaving room
        this.competitiveDrillService.hideRoomOverlays();
        
        this.onLeaveRoom();
    }

    onCloseErrorWordsModal(): void {
        this.adaptiveService.hideErrorWordsModal();
    }

    getErrorWords(): string[] {
        return this.adaptiveService.getErrorWords();
    }

    onGenerateAdaptiveDrill(settings?: {difficulty: DrillDifficulty, length: DrillLength}): void {
        const tempPreferences = { ...this.drillPreferences };
        if (settings) {
            tempPreferences.drillDifficulty = settings.difficulty;
            tempPreferences.drillLength = settings.length;
        }
        
        this.adaptiveService.generateAdaptiveDrill(tempPreferences).then(adaptiveWords => {
            if (adaptiveWords.length > 0) {
                this.startDrill(adaptiveWords);
                this.drillStateManagementService.setInputFocusState(true);
                this.focusInput();
            }
        });
    }

    private resetDrillStats(): void {
        this.drillStateManagementService.updateDrillStatistic(this.drillStatisticsService.resetDrillStats());

        this.wpm = 0;
        this.accuracy = 100;

        this.realTimeDataService.resetRealTimeData();

        this.lastActivityTime = 0;
        this.isUserInactive = false;
        this.hasBeenInactive = false;
        this.afkReason = '';
        
        this.stopInactivityMonitoring();
        this.timerManagementService.resetTimer(this.drillPreferences);
        this.adaptiveService.resetAdaptiveState();
    }

    fillRandomDrillText(): void {
        this.drillStateManagementService.fillRandomDrillText(this.drillPreferences);
    }

    onDrillPreferenceChange(preference: DrillPreference): void {
        this.drillPreferences = preference;
        localStorage.setItem('drillPreference', JSON.stringify(preference));

        if (preference.drillType !== this.currentDrillType) {
            this.currentDrillType = preference.drillType;
            this.navigationService.setCurrentDrillType(this.currentDrillType);
        }

        // always restart drill when preferences change to ensure proper initialization
        if (this.isDrillActive) {
            this.stopDrill(this.drillPreferences.drillType === DrillType.Adaptive);
            this.resetDrillStats();

            if (this.drillPreferences.drillType === DrillType.Adaptive) {
                this.onNewAdaptiveDrill();
            }
            else {
                this.startDrill();
                this.focusInput();
            }
        }
    }

    private setTypingState(isTyping: boolean): void {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.drillStateManagementService.setTypingState(isTyping);

        if (isTyping) {
            // reset typing state after 2 seconds of no typing
            this.typingTimeout = setTimeout(() => {
                this.drillStateManagementService.setTypingState(false);
            }, 2000);
        }
    }

    onPostDrillSubmit(): void {
        this.drillStateManagementService.setSubmissionState(false, '');

        const sourceTextArray = this.sourceText.map(word => word.join('').trim());

        const typedWordsArray = this.typedText.map(word => {
            return word.map(char => char?.key?.trim() || '').join('');
        });

        const drillSubmission: DrillSubmissionRequest = {
            drillDifficulty: this.drillPreferences.drillDifficulty,
            drillType: this.drillPreferences.drillType,
            sourceText: sourceTextArray,
            typedWords: typedWordsArray,
            drillStatistic: this.drillStatistic
        };

        this.drillSubmissionService.submitDrill(
            drillSubmission,
            this.drillPreferences,
            this.hasBeenInactive,
            (loading: boolean) => this.drillStateManagementService.setSubmissionState(loading)
        ).then(() => {
            this.drillStateManagementService.hidePostDrillOverlay();
        }).catch((error: any) => {
            this.drillStateManagementService.setSubmissionState(false, error.message || 'An error occurred during submission.');
        });
    }

    // afk protection and inactivity detection methods
    private updateUserActivity(): void {
        this.lastActivityTime = Date.now();

        // if user was inactive and now becomes active, clear the current afk state but keep the permanent flag
        // only show notification if drill is actually active and started
        const timerState = this.timerManagementService.getCurrentTimerState();
        if (this.isUserInactive && this.isDrillActive && timerState.startTime > 0) {
            this.isUserInactive = false;
            // report resumption to server in competitive mode
            if (this.isCompetitive && this.roomState.roomCode) {
                this.signalRService.reportPlayerAFK(this.roomState.roomCode, false).catch(console.error);
            }
            this.notificationService.createNotification('info', 'Activity Resumed', 'You can continue typing, but this drill cannot be submitted due to previous inactivity.');
        } else if (this.isUserInactive) {
            // just clear the inactive state without notification if drill hasn't started
            this.isUserInactive = false;
            // report resumption to server in competitive mode if in a room
            if (this.isCompetitive && this.roomState.roomCode) {
                this.signalRService.reportPlayerAFK(this.roomState.roomCode, false).catch(console.error);
            }
        }

        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }

        // set new inactivity timeout only if drill is active
        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        if (this.isDrillActive && currentTimerState.startTime > 0) {
            this.inactivityTimeout = setTimeout(() => {
                this.isUserInactive = true;
                this.hasBeenInactive = true;
                this.afkReason = 'Inactivity detected, so drill cannot be submitted.';
                
                // report AFK status to server in competitive mode
                if (this.isCompetitive && this.roomState.roomCode) {
                    this.signalRService.reportPlayerAFK(this.roomState.roomCode, true).catch(console.error);
                }
                
                this.notificationService.createNotification('error', 'AFK Detected', this.afkReason);
            }, this.MAX_INACTIVITY_SECONDS * 1000);
        }
    }

    private startInactivityMonitoring(): void {
        // check for inactivity every INACTIVITY_CHECK_INTERVAL
        this.inactivityCheckInterval = setInterval(() => {
            // only monitor if drill is active and has started
            const currentTimerState = this.timerManagementService.getCurrentTimerState();
            if (this.isDrillActive && currentTimerState.startTime > 0) {
                const currentTime = Date.now();
                const timeSinceLastActivity = (currentTime - this.lastActivityTime) / 1000;

                if (timeSinceLastActivity >= this.MAX_INACTIVITY_SECONDS && !this.isUserInactive) {
                    this.isUserInactive = true;
                    this.hasBeenInactive = true;
                    this.afkReason = 'Inactivity detected, so drill cannot be submitted.';
                    this.notificationService.createNotification('error', 'AFK Detected', this.afkReason);
                }
            }
        }, this.INACTIVITY_CHECK_INTERVAL);
    }

    private stopInactivityMonitoring(): void {
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
            this.inactivityTimeout = null;
        }

        if (this.inactivityCheckInterval) {
            clearInterval(this.inactivityCheckInterval);
            this.inactivityCheckInterval = null;
        }
    }



    // host listener for global activity tracking
    @HostListener('document:keydown', ['$event'])
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:touchstart', ['$event'])
    onGlobalActivity(): void {
        // only track activity if drill is active, started, and is a non-timed drill
        const currentTimerState = this.timerManagementService.getCurrentTimerState();
        if (this.isDrillActive && currentTimerState.startTime > 0 && this.drillPreferences.drillType !== DrillType.Timed) {
            this.updateUserActivity();
        }
    }

    // adaptive drill state getters for template
    get showAdaptiveDrillOverlay(): boolean {
        // Don't show adaptive drill overlay in competitive mode
        if (this.isCompetitive) {
            return false;
        }
        return this.adaptiveService.getCurrentAdaptiveState().showAdaptiveDrillOverlay;
    }

    get showErrorWordsModal(): boolean {
        return this.adaptiveService.getCurrentAdaptiveState().showErrorWordsModal;
    }

    get isLoadingErrorWords(): boolean {
        return this.adaptiveService.getCurrentAdaptiveState().isLoadingErrorWords;
    }

    get errorProneWords(): string[] {
        return this.adaptiveService.getCurrentAdaptiveState().errorProneWords;
    }

    get isGeneratingAdaptive(): boolean {
        return this.adaptiveService.getCurrentAdaptiveState().isGeneratingAdaptive;
    }

    // drill state getters for template
    get isDrillActive(): boolean {
        return this.drillStateManagementService.getCurrentDrillState().isDrillActive;
    }

    get sourceText(): string[][] {
        return this.drillStateManagementService.getCurrentDrillState().sourceText;
    }

    get wordLocked(): boolean[] {
        return this.drillStateManagementService.getCurrentDrillState().wordLocked;
    }

    get typedText(): (any | undefined)[][] {
        return this.drillStateManagementService.getCurrentDrillState().typedText;
    }

    get currentWordIndex(): number {
        return this.drillStateManagementService.getCurrentDrillState().currentWordIndex;
    }

    get currentCharIndex(): number {
        return this.drillStateManagementService.getCurrentDrillState().currentCharIndex;
    }

    get drillStatistic(): DrillStatistic {
        return this.drillStateManagementService.getCurrentDrillState().drillStatistic;
    }

    get isInputFocused(): boolean {
        return this.drillStateManagementService.getCurrentDrillState().isInputFocused;
    }

    get currentInput(): string {
        return this.drillStateManagementService.getCurrentDrillState().currentInput;
    }

    get isTyping(): boolean {
        return this.drillStateManagementService.getCurrentDrillState().isTyping;
    }

    get showPostDrillOverlay(): boolean {
        // Don't show regular post-drill overlay in competitive mode
        if (this.isCompetitive) {
            return false;
        }
        return this.drillStateManagementService.getCurrentDrillState().showPostDrillOverlay;
    }

    get isSubmitting(): boolean {
        return this.drillStateManagementService.getCurrentDrillState().isSubmitting;
    }

    get submitError(): string {
        return this.drillStateManagementService.getCurrentDrillState().submitError;
    }

    get showPlayerPanel(): boolean {
        return this.isCompetitive && !!this.roomState.roomCode;
    }

    get continuedPlayersSet(): Set<string> {
        return this.continuedPlayers;
    }

    ngOnDestroy(): void {
        try {
            // console.log('DRILL ENGINE: Cleaning up component');
            
            // Save final book progress if in classics mode
            if (this.currentBookId && this.sourceText.length > 0) {
                const totalWordCount = this.sourceText.length;
                const typedWordCount = this.currentWordIndex;
                const isCompleted = typedWordCount >= totalWordCount;
                
                this.bookService.saveBookProgress(
                    this.currentBookId,
                    typedWordCount,
                    totalWordCount,
                    isCompleted
                ).subscribe({
                    next: (progress) => {
                        console.log('Final book progress saved on exit:', progress);
                        // Trigger progress refresh for classics component
                        this.bookService.triggerProgressRefresh();
                    },
                    error: (error) => {
                        console.error('Failed to save final book progress:', error);
                    }
                });
            }
            
            // Stop progress saving
            this.stopProgressSaving();
            
            // Clean up subscriptions
            this.subscriptions.forEach(sub => {
                try {
                    sub.unsubscribe();
                } catch (error) {
                    console.error('Error unsubscribing from subscription:', error);
                }
            });
            
            // Clear any active timers
            if (this.statsInterval) {
                clearInterval(this.statsInterval);
                this.statsInterval = null;
            }
            
            // Stop inactivity monitoring
            this.stopInactivityMonitoring();
            
            // Clean up competitive drill service if in competitive mode
            if (this.isCompetitive) {
                this.competitiveDrillService.cleanup();
            }
            
            // console.log('DRILL ENGINE: Component cleanup completed');
        } catch (error) {
            console.error('DRILL ENGINE: Error during component cleanup:', error);
        }
    }
}
