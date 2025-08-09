import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-competitive-post-drill-overlay',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './competitive-post-drill-overlay.component.html',
  styleUrl: './competitive-post-drill-overlay.component.scss'
})
export class CompetitivePostDrillOverlayComponent {
  @Input() show: boolean = false;
  @Input() winnerUsername: string = '';
  @Input() isSubmitting: boolean = false;
  @Input() submitError: string = '';

  @Output() continue = new EventEmitter<void>();
  @Output() leaveRoom = new EventEmitter<void>();
}
