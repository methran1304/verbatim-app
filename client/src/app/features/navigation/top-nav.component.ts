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
import { JwtDecoderUtil, JwtPayload } from '../../core/utils/jwt-decoder.util';
import { DrillService } from '../../services/drill.service';

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
    NzDividerModule
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit {
  isDarkMode = false;
  currentDrillType: DrillType | null = null;
  currentSection = 'drills';
  username: string = 'User';

  // drill dropdown items
  drillMenuItems = [
    {
      key: DrillType.Timed,
      label: 'Timed',
      icon: 'clock-circle'
    },
    {
      key: DrillType.Marathon,
      label: 'Marathon',
      icon: 'thunderbolt'
    },
    {
      key: DrillType.Memory,
      label: 'Memory',
      icon: 'eye'
    },
    {
      key: DrillType.Adaptive,
      label: 'Adaptive',
      icon: 'bulb'
    }
  ];

  // competitive dropdown items
  competitiveMenuItems = [
    {
      key: 'compete',
      label: 'Compete',
      icon: 'team'
    },
    {
      key: 'leaderboard',
      label: 'Leaderboard',
      icon: 'bar-chart'
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
      // TODO: Implement compete feature
      console.log('Compete feature coming soon');
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
    }
  }

  onLogoClick() {
    this.router.navigate(['/drill'], { queryParams: { type: 'timed' } });
    this.currentSection = 'drills';
    this.currentDrillType = DrillType.Timed;
    this.navigationService.setCurrentSection('drills');
    this.navigationService.setCurrentDrillType(DrillType.Timed);
  }

  getDrillTypeLabel(drillType: DrillType): string {
    return this.navigationService.getDrillTypeLabel(drillType);
  }
} 