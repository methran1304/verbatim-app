import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ThemeService } from '../../services/theme.service';
import { NavigationService } from './navigation.service';
import { DrillType } from '../../models/enums/drill-type.enum';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../models/enums/drill-length.enum';
import { AuthService } from '../../services/auth.service';
import { DrillService } from '../../services/drill.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzDividerModule,
    NzToolTipModule,
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit {
  isDarkMode = false;
  currentDrillType: DrillType | null = null;
  currentDrillTypeLabel: string = 'Timed';
  currentDrillTypeIcon: string = 'clock-circle';
  currentSection = 'drills';
  username: string = 'User';
  currentDrillTypeTooltip: string = '';

  // drill dropdown items
  drillMenuItems = [
    {
      key: DrillType.Timed,
      label: 'Timed',
      icon: 'clock-circle',
      tooltip: 'Type as many words as you can before the timer ends. Choose from 15s, 30s, 60s, or 120s.'
    },
    {
      key: DrillType.Marathon,
      label: 'Marathon',
      icon: 'thunderbolt',
      tooltip: 'No timer. Just type through a fixed number of words at your own pace.'
    },
    {
      key: DrillType.Memory,
      label: 'Memory',
      icon: 'eye',
      tooltip: 'Words appear briefly and vanish. Rely on your memory to type them correctly.'
    },
    {
      key: DrillType.Adaptive,
      label: 'Adaptive',
      icon: 'bulb',
      tooltip: 'Practice the words you struggle with most. Powered by AI to improve your weak spots.'
    }
  ];

  // competitive dropdown items
  competitiveMenuItems = [
    {
      key: 'compete',
      label: 'Compete',
      icon: 'team',
      tooltip: 'Compete with a friend in realtime by creating or joining a room. Challenge others and improve together.'
    },
    {
      key: 'leaderboard',
      label: 'Leaderboard',
      icon: 'bar-chart',
      tooltip: 'View the leaderboard to see top performers and track your ranking among other typists.'
    }
  ];

  // user dropdown items
  userMenuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: 'user'
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: 'logout'
    }
  ];

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private drillService: DrillService
  ) {
  }

  ngOnInit() {
    const drillPreferences = this.drillService.getDrillPreferences();

    if (drillPreferences) {
      this.onDrillSelect(drillPreferences.drillType);
    } else {
      this.onDrillSelect(DrillType.Timed);
    }

    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.navigationService.getCurrentDrillType().subscribe(drillType => {
      this.currentDrillType = drillType;
      this.currentDrillTypeTooltip = this.drillMenuItems.find(item => item.key === drillType)?.tooltip || '';
      if (drillType) {
        this.currentDrillTypeLabel = this.getDrillTypeLabel(drillType);
        this.currentDrillTypeIcon = this.getDrillTypeIcon(drillType);
      }
    });

    this.navigationService.getCurrentSection().subscribe(section => {
      this.currentSection = section;
    });

    // get username from auth service
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.username = username;
      } else {
        this.username = 'User';
      }
    });
  }

  onDrillSelect(drillType: DrillType) {
    this.currentDrillType = drillType;
    this.currentDrillTypeLabel = this.getDrillTypeLabel(drillType);
    this.currentDrillTypeIcon = this.getDrillTypeIcon(drillType);
    this.navigationService.setCurrentDrillType(drillType);
    this.navigationService.setCurrentSection('drills');
    
    // update drill preferences in local storage
    const currentPreferences = this.drillService.getDrillPreferences();
    if (currentPreferences) {
      currentPreferences.drillType = drillType;
      this.drillService.setDrillPreferences(currentPreferences);
    } else {
      // create default preferences if none exists
      const defaultPreferences = {
        drillType: drillType,
        drillDifficulty: DrillDifficulty.Intermediate,
        drillLength: DrillLength.Medium,
        drillDuration: 30
      };
      this.drillService.setDrillPreferences(defaultPreferences);
    }
    
    this.router.navigate(['/drill'], { 
      queryParams: { type: drillType } 
    });
  }

  onCompetitiveSelect(key: string) {
    if (key === 'leaderboard') {
      this.router.navigate(['/leaderboard']);
    } else if (key === 'compete') {
      this.router.navigate(['/competitive-drill']);
    }
  }

  onUserSelect(key: string) {
    if (key === 'profile') {
      this.router.navigate(['/profile']);
    } else if (key === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  onSectionClick(section: string) {
    this.currentSection = section;
    this.navigationService.setCurrentSection(section);
    
    switch (section) {
      case 'classics':
        this.router.navigate(['/classics']);
        break;
      case 'guide':
        this.router.navigate(['/guide']);
        break;
      case 'ai-insights':
        this.router.navigate(['/ai-insights']);
        break;
    }
  }

  onLogoClick() {
    this.router.navigate(['/drill'], { queryParams: { type: 'timed' } });
    this.currentSection = 'drills';
    this.currentDrillType = DrillType.Timed;
    this.currentDrillTypeLabel = this.getDrillTypeLabel(DrillType.Timed);
    this.currentDrillTypeIcon = this.getDrillTypeIcon(DrillType.Timed);
    this.navigationService.setCurrentSection('drills');
    this.navigationService.setCurrentDrillType(DrillType.Timed);
  }

  getDrillTypeLabel(drillType: DrillType): string {
    return this.navigationService.getDrillTypeLabel(drillType);
  }

  getDrillTypeIcon(drillType: DrillType): string {
    const item = this.drillMenuItems.find(item => item.key === drillType);
    return item ? item.icon : 'clock-circle';
  }
} 