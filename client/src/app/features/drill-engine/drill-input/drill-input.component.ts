import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SpecialKeys } from '../../../core/constants/keys.constant';

@Component({
    selector: 'app-drill-input',
    standalone: true,
    templateUrl: './drill-input.component.html',
    styleUrl: './drill-input.component.scss',
})
export class DrillInputComponent implements AfterViewInit, OnDestroy {
    @Output() keyTyped = new EventEmitter<string>();
    @Output() focusEvent = new EventEmitter<void>();
    @Output() blurEvent = new EventEmitter<void>();
    @ViewChild('drillInput') drillInput!: ElementRef<HTMLInputElement>;

    constructor(private focusMonitor: FocusMonitor) {}

    ngAfterViewInit(): void {
        this.focusMonitor.monitor(this.drillInput).subscribe((origin) => {
            if (origin) {
                this.focusEvent.emit();
                // prevent scroll on focus only if on drill page
                if (this.isOnDrillPage()) {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 0);
                }
            } else {
                this.blurEvent.emit();
            }
        });

        this.focusInput();
        
        // add focus event listener to prevent scroll only on drill pages
        this.drillInput.nativeElement.addEventListener('focus', (event) => {
            if (this.isOnDrillPage()) {
                event.preventDefault();
                // Prevent any scroll behavior
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0);
            }
        });
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.drillInput);
    }

    onKeyDown(event: KeyboardEvent): void {
        const key = event.key;

        // ctrl or alt + backspace
        if (key === 'Backspace' && (event.ctrlKey || event.altKey)) {
            this.keyTyped.emit('CTRL_BACKSPACE');
        }

        // unfocus input
        else if (key === 'Escape') {
            this.keyTyped.emit('ESCAPE');
        }

        // alphanumeric keys, space, and enter key
        else if (/^[a-zA-Z0-9 ]$/.test(key) || key === SpecialKeys.Backspace || key === 'Enter') {
            this.keyTyped.emit(key);
        }

        event.preventDefault();
    }

    clearDrillInput() {
        if (this.drillInput?.nativeElement) {
            this.drillInput.nativeElement.value = '';
        }
    }

    focusInput() {
        this.drillInput.nativeElement.focus();
    }

    blurInput() {
        this.drillInput.nativeElement.blur();
    }

    private isOnDrillPage(): boolean {
        return this.drillInput?.nativeElement?.closest('.drill-page') !== null;
    }
}
