import {
    Component,
    Input,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    AfterViewChecked,
    SimpleChanges,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyStroke } from '../../../models/interfaces/typed-char.interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AfkOverlayComponent } from '../overlays/afk-overlay/afk-overlay.component';
import { PostDrillOverlayComponent } from '../overlays/post-drill-overlay/post-drill-overlay.component';
import { AdaptiveDrillOverlayComponent } from '../overlays/adaptive-drill-overlay/adaptive-drill-overlay.component';
import { RoomOverlayComponent } from '../overlays/room-overlay/room-overlay.component';
import { LobbyOverlayComponent } from '../overlays/lobby-overlay/lobby-overlay.component';
import { DrillDifficulty } from '../../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../../models/enums/drill-length.enum';

@Component({
    selector: 'app-drill-text',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzTagModule, NzButtonModule, NzDividerModule, NzIconModule, NzToolTipModule, AfkOverlayComponent, PostDrillOverlayComponent, AdaptiveDrillOverlayComponent, RoomOverlayComponent, LobbyOverlayComponent],
    templateUrl: './drill-text.component.html',
    styleUrl: './drill-text.component.scss',
})
export class DrillTextComponent implements AfterViewChecked, OnChanges {
    @Input() sourceText: string[][] = [];
    @Input() typedInput: (KeyStroke | undefined)[][] = [];
    @Input() currentWordIndex: number = 0;
    @Input() currentCharIndex: number = 0;
    @Input() isFocused: boolean = true;
    @Input() showPostDrillOverlay: boolean = false;
    @Input() showAdaptiveDrillOverlay: boolean = false;
    @Input() isSubmitting: boolean = false;
    @Input() submitError: string = '';
    @Input() isUserInactive: boolean = false;
    @Input() hasBeenInactive: boolean = false;
    @Input() afkReason: string = '';
    @Input() isGeneratingAdaptive: boolean = false;
    @Input() isLoadingErrorWords: boolean = false;
    @Input() showRoomOverlay: boolean = false;
    @Input() showLobbyOverlay: boolean = false;
    @Input() roomCode: string = '';
    @Input() userRole: 'Creator' | 'Member' = 'Member';
    @Input() roomState: 'Waiting' | 'Ready' | 'InProgress' | 'Finished' = 'Waiting';
    @Input() drillType: string = 'Timed';
    @Input() difficulty: string = 'Intermediate';
    @Input() duration: string = '60s';
    @Input() isCreatingRoom: boolean = false;
    @Input() isJoiningRoom: boolean = false;
    @Input() currentDifficulty: DrillDifficulty = DrillDifficulty.Intermediate;
    @Input() currentLength: DrillLength = DrillLength.Medium;
    @Input() isCurrentUserReady: boolean = false;
    @Input() players: any[] = [];

    @Output() postDrillRestart = new EventEmitter<void>();
    @Output() postDrillSubmit = new EventEmitter<void>();
    @Output() generateAdaptiveDrill = new EventEmitter<{difficulty: DrillDifficulty, length: DrillLength}>();
    @Output() viewErrorProneWords = new EventEmitter<{difficulty: DrillDifficulty, length: DrillLength}>();
    @Output() createRoom = new EventEmitter<void>();
    @Output() joinRoom = new EventEmitter<void>();
    @Output() joinRoomWithCode = new EventEmitter<string>();
    @Output() goBack = new EventEmitter<void>();
    @Output() leaveRoom = new EventEmitter<void>();
    @Output() startDrill = new EventEmitter<void>();
    @Output() setReady = new EventEmitter<void>();

    @ViewChildren('wordEl', { read: ElementRef }) wordElements!: QueryList<ElementRef<HTMLElement>>;
    @ViewChild('drillText', { read: ElementRef }) drillTextEl!: ElementRef<HTMLElement>;

    private pendingScroll: boolean = false;
    delayedAfkOverlay: boolean = false;
    private afkTimeout: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['currentWordIndex'] &&
            !changes['currentWordIndex'].firstChange
        ) {
            this.pendingScroll = true;
        }
        if (changes['isFocused'] && !this.showPostDrillOverlay) {
            if (this.isFocused) {
                this.delayedAfkOverlay = false;
                if (this.afkTimeout) {
                    clearTimeout(this.afkTimeout);
                }
            } else {
                if (this.afkTimeout) {
                    clearTimeout(this.afkTimeout);
                }
                this.afkTimeout = setTimeout(() => {
                    this.delayedAfkOverlay = true;
                }, 400);
            }
        }
    }

    ngAfterViewChecked(): void {
        if (this.pendingScroll) {
            setTimeout(() => this.scrollToCenterLine(), 0);
            this.pendingScroll = false;
        }
    }

    private scrollToCenterLine(): void {
        const elements = this.wordElements.toArray();
        const activeEl = elements[this.currentWordIndex]?.nativeElement;
        const containerEl = this.drillTextEl?.nativeElement;

        if (!activeEl || !containerEl) return;

        const elTop = activeEl.offsetTop;
        const elHeight = activeEl.offsetHeight;
        const containerHeight = containerEl.clientHeight;

        const targetScrollTop = elTop - (containerHeight / 2) + (elHeight / 2);

        containerEl.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
        });
    }

    getLetterClass(wordIdx: number, charIdx: number): string {
        const stroke = this.typedInput[wordIdx]?.[charIdx];

        if (!stroke) {
            return wordIdx === this.currentWordIndex &&
                charIdx === this.currentCharIndex
                ? 'letter-active'
                : '';
        }

        return stroke.correct ? 'letter-correct' : 'letter-incorrect';
    }

    getWordClass(wordIdx: number): string {
        if (this.isActive(wordIdx)) {
            return this.isFocused ? 'word-active' : 'word-active-blur';
        }

        const strokes = this.typedInput[wordIdx];
        const source = this.sourceText[wordIdx];
        if (!strokes || strokes.every((k) => !k)) return '';

        const isCorrect = strokes.every((k, i) => k?.key === source[i]);
        return isCorrect ? 'word-correct' : 'word-incorrect';
    }

    isActive(wordIdx: number): boolean {
        return wordIdx === this.currentWordIndex;
    }
}