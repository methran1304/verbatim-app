// === drill-engine.component.ts ===
import { Component, NgZone, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        NzCardModule,
        NzButtonModule,
        NzModalModule,
        NzTagModule
    ],
    providers: [],
    templateUrl: './drill-engine.component.html',
    styleUrl: './drill-engine.component.scss',
})
export class DrillEngineComponent implements OnInit {
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
    private afkPlayers: Set<string> = new Set<string>();


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
        private competitiveDrillService: CompetitiveDrillService
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
            if (drillType && Object.values(DrillType).includes(drillType)) {
                this.currentDrillType = drillType as DrillType;
                this.navigationService.setCurrentDrillType(this.currentDrillType);

                // update drill preferences with new drill type and save to localStorage
                this.drillPreferences.drillType = this.currentDrillType;

                localStorage.setItem('drillPreference', JSON.stringify(this.drillPreferences));

                this.onNewDrill();
            } else if (!drillType) {
                // if no drill type in url, start with current drill type from preferences
                this.onNewDrill();
            }
        });

        this.themeService.getDarkMode().subscribe(isDark => {
            this.isDarkMode = isDark;
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
                    console.log('Using competitive drill preferences:', competitivePreferences);
                }
            });

            // subscribe to players data
            this.competitiveDrillService.players$.subscribe(signalRPlayers => {
                const currentRoomState = this.competitiveDrillService.getCurrentRoomState();
                this.players = signalRPlayers.map(player => ({
                    userId: player.userId,
                    username: player.username,
                    level: player.level,
                    state: player.state,
                    isReady: player.state === 'Ready',
                    isCreator: player.isCreator || false,
                    progress: player.statistics?.completionPercentage,
                    wpm: player.statistics?.wpm,
                    accuracy: player.statistics?.accuracy,
                    isAFK: this.afkPlayers.has(player.userId)
                }));
                
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
                
                this.players = this.players.map(p => {
                    const stat = statsByUser.get(p.userId);
                    if (!stat) return p;
                    const completion = (stat.completionPercentage ?? stat.CompletionPercentage ?? stat.completionpercentage) as number | undefined;
                    const wpm = (stat.wpm ?? stat.WPM) as number | undefined;
                    const accuracy = (stat.accuracy ?? stat.Accuracy) as number | undefined;
                    return {
                        ...p,
                        progress: completion,
                        wpm: wpm,
                        accuracy: accuracy
                    };
                });
            });

            // subscribe to AFK events
            this.signalRService.onPlayerAFK$.subscribe(({ roomId, playerId }) => {
                this.afkPlayers.add(playerId);
                this.players = this.players.map(p => p.userId === playerId ? { ...p, isAFK: true } : p);
            });

            // subscribe to countdown events
            this.signalRService.onCountdown$.subscribe(({ roomId, countdown }) => {
                console.log(`DRILL ENGINE: Countdown event received - roomId: ${roomId}, countdown: ${countdown}`);

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
                    console.log(`DRILL ENGINE: Received drill text from competitive service`);
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
                    }, 500);
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
                const winner = results?.playerResults?.find((p: any) => p.isWinner);
                this.winnerMessage = winner ? `${winner.username} wins!` : '';
            });

            // get current user ID from JWT token
            const token = localStorage.getItem('accessToken') || '';
            this.currentUserId = JwtDecoderUtil.getUserId(token) || '';
        }
    }

    startDrill(adaptiveWords: string[] = []): void {
        this.drillStateManagementService.startDrill(adaptiveWords, this.drillPreferences);
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

            if (this.currentWordIndex >= this.sourceText.length) {
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
}
