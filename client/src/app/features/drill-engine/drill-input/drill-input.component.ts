import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { SpecialKeys } from '../../../core/constants/keys.constant';

@Component({
    selector: 'app-drill-input',
    standalone: true,
    templateUrl: './drill-input.component.html',
    styleUrl: './drill-input.component.scss',
})
export class DrillInputComponent implements AfterViewInit {
    @Output() keyTyped = new EventEmitter<string>();
    @ViewChild('drillInput') drillInput!: ElementRef<HTMLInputElement>;

    ngAfterViewInit(): void {
        this.drillInput.nativeElement.focus();
    }

    onKeyDown(event: KeyboardEvent): void {
        const key = event.key;

        console.log(key);

        // ctrl or cmd + Backspace
        const isCtrlOrAltBackspace =
            key === 'Backspace' && (event.ctrlKey || event.altKey);

        if (isCtrlOrAltBackspace) {
            this.keyTyped.emit('CTRL_BACKSPACE');
            event.preventDefault();
            return;
        }

        if (/^[a-zA-Z0-9 ]$/.test(key) || key === SpecialKeys.Backspace) {
            this.keyTyped.emit(key);
        }

        event.preventDefault();
    }

    clearDrillInput() {
        if (this.drillInput?.nativeElement) {
            this.drillInput.nativeElement.value = '';
        }
    }
}
