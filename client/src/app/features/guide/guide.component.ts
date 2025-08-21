import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { VirtualKeyboardComponent } from '../drill-engine/virtual-keyboard/virtual-keyboard.component';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzTabsModule,
    NzCardModule,
    NzIconModule,
    NzDividerModule,
    NzTagModule,
    NzProgressModule,
    NzTableModule,
    NzToolTipModule,
    NzPopoverModule,
    VirtualKeyboardComponent
  ]
})
export class GuideComponent implements OnInit, OnDestroy {
  activeTabIndex = 0;
  isDarkTheme = false;
  private themeSubscription?: Subscription;



  // Competitive ranking levels
  competitiveRanks = [
    { rank: 'Bronze', points: '0-999', description: 'Beginner competitive player' },
    { rank: 'Silver', points: '1,000-2,499', description: 'Developing competitive skills' },
    { rank: 'Gold', points: '2,500-4,999', description: 'Skilled competitive player' },
    { rank: 'Platinum', points: '5,000-9,999', description: 'Advanced competitive player' },
    { rank: 'Diamond', points: '10,000-19,999', description: 'Expert competitive player' },
    { rank: 'Master', points: '20,000-49,999', description: 'Elite competitive player' },
    { rank: 'Grandmaster', points: '50,000+', description: 'Legendary competitive player' }
  ];

  // Overall levels
  overallLevels = [
    { level: 'Beginner', description: 'New to touch typing' },
    { level: 'Intermediate', description: 'Developing typing skills' },
    { level: 'Advanced', description: 'Skilled typist' },
    { level: 'Expert', description: 'Master typist' }
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;
  }

  getRankClass(rank: string): string {
    const rankClasses: { [key: string]: string } = {
      'Bronze': 'rank-bronze',
      'Silver': 'rank-silver',
      'Gold': 'rank-gold',
      'Platinum': 'rank-platinum',
      'Diamond': 'rank-diamond',
      'Master': 'rank-master',
      'Grandmaster': 'rank-grandmaster'
    };
    return rankClasses[rank] || 'rank-bronze';
  }

  getLevelClass(level: string): string {
    const levelClasses: { [key: string]: string } = {
      'Beginner': 'level-beginner',
      'Intermediate': 'level-intermediate',
      'Advanced': 'level-advanced',
      'Expert': 'level-expert'
    };
    return levelClasses[level] || 'level-beginner';
  }
}
