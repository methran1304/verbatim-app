import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown-overlay.component.html',
  styleUrl: './countdown-overlay.component.scss'
})
export class CountdownOverlayComponent {
  @Input() show: boolean = false;
  @Input() countdown: number = 0;
  @Input() isBegin: boolean = false;

  get countdownText(): string {
    if (this.isBegin) {
      return 'BEGIN!';
    }
    return this.countdown.toString();
  }

  get countdownClass(): string {
    if (this.isBegin) {
      return 'countdown-begin';
    }
    return 'countdown-number';
  }
}
