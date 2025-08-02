import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-adaptive-drill-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule, NzIconModule],
    templateUrl: './adaptive-drill-overlay.component.html',
    styleUrl: './adaptive-drill-overlay.component.scss',
})
export class AdaptiveDrillOverlayComponent {
    @Input() show: boolean = false;
    @Input() isLoadingErrorWords: boolean = false;
    @Input() isGeneratingAdaptive: boolean = false;
    
    @Output() viewErrorProneWords = new EventEmitter<void>();
    @Output() generateAdaptiveDrill = new EventEmitter<void>();
} 