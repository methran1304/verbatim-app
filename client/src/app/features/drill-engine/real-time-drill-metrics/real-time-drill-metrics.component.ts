import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-time-drill-metrics',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzStatisticModule],
  templateUrl: './real-time-drill-metrics.component.html',
  styleUrl: './real-time-drill-metrics.component.scss',
})
export class RealTimeDrillMetricsComponent {
  @Input() wpm: number = 0;
  @Input() accuracy: number = 100;
  @Input() remainingTime: string = '00:00';
} 