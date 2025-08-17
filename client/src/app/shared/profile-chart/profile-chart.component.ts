import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartDataPoint {
  date: string;
  wpm: number;
  accuracy: number;
  drills: number;
}

@Component({
  selector: 'app-profile-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <div class="chart-header">
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color wpm"></div>
            <span>WPM</span>
          </div>
          <div class="legend-item">
            <div class="legend-color accuracy"></div>
            <span>Accuracy (%)</span>
          </div>
        </div>
      </div>
      
      <div class="chart-content">
        <div class="chart-bars">
          <div 
            *ngFor="let dataPoint of chartData; let i = index"
            class="chart-bar-group"
          >
            <div class="bar-label">{{ formatDate(dataPoint.date) }}</div>
            <div class="bars">
              <div 
                class="bar wpm-bar"
                [style.height.px]="getBarHeight(dataPoint.wpm, 'wpm')"
                [title]="'WPM: ' + dataPoint.wpm"
              ></div>
              <div 
                class="bar accuracy-bar"
                [style.height.px]="getBarHeight(dataPoint.accuracy, 'accuracy')"
                [title]="'Accuracy: ' + dataPoint.accuracy + '%'"
              ></div>
            </div>
            <div class="drill-count">{{ dataPoint.drills }} drills</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 300px;
    }
    
    .chart-header {
      margin-bottom: 1rem;
      
      .chart-legend {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text);
          opacity: 0.7;
          
          .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            
            &.wpm {
              background: var(--color-primary);
            }
            
            &.accuracy {
              background: var(--color-success);
            }
          }
        }
      }
    }
    
    .chart-content {
      height: 200px;
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      padding: 0 1rem;
      
      .chart-bars {
        display: flex;
        align-items: flex-end;
        gap: 1rem;
        width: 100%;
        height: 100%;
        
        .chart-bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          
          .bar-label {
            font-size: 0.8rem;
            color: var(--color-text);
            opacity: 0.7;
            margin-bottom: 0.5rem;
            text-align: center;
            transform: rotate(-45deg);
            transform-origin: center;
            white-space: nowrap;
          }
          
          .bars {
            display: flex;
            gap: 2px;
            align-items: flex-end;
            height: 100%;
            width: 100%;
            
            .bar {
              flex: 1;
              min-width: 8px;
              border-radius: 2px 2px 0 0;
              transition: height 0.3s ease;
              
              &.wpm-bar {
                background: var(--color-primary);
              }
              
              &.accuracy-bar {
                background: var(--color-success);
              }
            }
          }
          
          .drill-count {
            font-size: 0.7rem;
            color: var(--color-text);
            opacity: 0.5;
            margin-top: 0.5rem;
            text-align: center;
          }
        }
      }
    }
  `]
})
export class ProfileChartComponent implements OnInit {
  @Input() data: ChartDataPoint[] = [];
  
  chartData: ChartDataPoint[] = [];
  
  ngOnInit(): void {
    this.chartData = this.data;
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  getBarHeight(value: number, type: 'wpm' | 'accuracy'): number {
    if (type === 'wpm') {
      // WPM scale: 0-100, max height 150px
      return Math.min((value / 100) * 150, 150);
    } else {
      // Accuracy scale: 0-100, max height 150px
      return Math.min((value / 100) * 150, 150);
    }
  }
}
