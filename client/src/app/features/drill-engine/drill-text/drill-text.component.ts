import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyStroke } from '../../../models/interfaces/typed-char.interface';

@Component({
    selector: 'app-drill-text',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './drill-text.component.html',
    styleUrl: './drill-text.component.scss',
})
export class DrillTextComponent {
    @Input() sourceText: string[][] = [];
    @Input() typedInput: (KeyStroke | undefined)[][] = [];
    @Input() currentWordIndex: number = 0;
    @Input() currentCharIndex: number = 0;

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
}
