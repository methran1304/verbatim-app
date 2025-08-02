import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
    selector: 'app-afk-overlay',
    standalone: true,
    imports: [CommonModule, NzCardModule],
    templateUrl: './afk-overlay.component.html',
    styleUrl: './afk-overlay.component.scss',
})
export class AfkOverlayComponent {
    @Input() show: boolean = false;
} 