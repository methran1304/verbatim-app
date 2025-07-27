import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PointTimeData } from '../../models/interfaces/drill-stats.interface';
import * as d3 from 'd3';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent implements OnInit, OnChanges {
  @Input() realTimeData: PointTimeData[] = [];
  @Input() isDarkMode: boolean = false;

  chartData: Array<{ name: string; series: Array<{ name: number; value: number }> }> = [];
  colorScheme: any = {
    domain: ['#52c41a', '#1890ff']
  };
  curve = d3.curveMonotoneX;

  ngOnInit(): void {
    this.updateColorScheme();
    this.prepareChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['realTimeData'] || changes['isDarkMode']) {
      this.updateColorScheme();
      this.prepareChartData();
    }
  }

  private updateColorScheme(): void {
    if (this.isDarkMode) {
      this.colorScheme = {
        domain: ['#52c41a', '#1890ff'] // Green and Blue for dark theme
      };
    } else {
      this.colorScheme = {
        domain: ['#52c41a', '#fa8c16'] // Green and Orange for light theme
      };
    }
  }

  private prepareChartData(): void {
    if (!this.realTimeData || this.realTimeData.length === 0) {
      this.chartData = [];
      return;
    }

    const wpmSeries = this.realTimeData.map(point => ({
      name: point.timePoint,
      value: point.wpm
    }));

    const accuracySeries = this.realTimeData.map(point => ({
      name: point.timePoint,
      value: point.accuracy
    }));

    this.chartData = [
      {
        name: 'WPM',
        series: wpmSeries
      },
      {
        name: 'Accuracy',
        series: accuracySeries
      }
    ];
  }
} 