import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
    selector: 'app-post-drill-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule, NzDividerModule, NzIconModule, NzToolTipModule],
    templateUrl: './post-drill-overlay.component.html',
    styleUrl: './post-drill-overlay.component.scss',
})
export class PostDrillOverlayComponent {
    @Input() show: boolean = false;
    @Input() isSubmitting: boolean = false;
    @Input() submitError: string = '';
    @Input() hasBeenInactive: boolean = false;
    @Input() afkReason: string = '';
    
    @Output() postDrillRestart = new EventEmitter<void>();
    @Output() postDrillSubmit = new EventEmitter<void>();
} 