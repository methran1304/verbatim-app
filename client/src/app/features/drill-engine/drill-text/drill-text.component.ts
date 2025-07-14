import {
    Component,
    Input,
    ElementRef,
    QueryList,
    ViewChildren,
    AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyStroke } from '../../../models/interfaces/typed-char.interface';

@Component({
    selector: 'app-drill-text',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './drill-text.component.html',
    styleUrl: './drill-text.component.scss',
})
export class DrillTextComponent implements AfterViewChecked {
    @Input() sourceText: string[][] = [];
    @Input() typedInput: (KeyStroke | undefined)[][] = [];
    @Input() currentWordIndex: number = 0;
    @Input() currentCharIndex: number = 0;
    @Input() isFocused: boolean = true;

    @ViewChildren('wordRef') wordElements!: QueryList<
        ElementRef<HTMLSpanElement>
    >;

    ngAfterViewChecked(): void {
        const active = this.wordElements.get(this.currentWordIndex);
        if (active) {
            active.nativeElement.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
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
