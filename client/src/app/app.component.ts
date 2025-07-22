import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ThemeService } from './services/theme.service';
import { ThemeType } from './models/enums/theme-type.enum';
import { UserPreference } from './models/interfaces/user-preference.interface';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, FormsModule, NzIconModule, NzSwitchModule, NzCardModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'verbatim.app';
    darkMode = false;
    userPreference!: UserPreference;
    
    // screen size detection
    isScreenTooSmall: boolean = false;
    screenWidth: number = 0;
    screenHeight: number = 0;
    private readonly MIN_WIDTH = 800;
    private readonly MIN_HEIGHT = 800;

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        // get user preference from localStorage
        let storedPreference: UserPreference = JSON.parse(localStorage.getItem('userPreference') ?? '{}');
        if (!storedPreference.theme) {
            // detect system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            storedPreference = { theme: prefersDark ? ThemeType.Dark : ThemeType.Light };
            localStorage.setItem('userPreference', JSON.stringify(storedPreference));
        }
        this.userPreference = storedPreference;
        this.darkMode = this.userPreference.theme === ThemeType.Dark;
        this.setTheme(this.darkMode);
        this.themeService.setDarkMode(this.darkMode);
        // listen for theme changes from ThemeService
        this.themeService.getDarkMode().subscribe(isDark => {
            if (isDark !== this.darkMode) {
                this.darkMode = isDark;
                this.userPreference.theme = isDark ? ThemeType.Dark : ThemeType.Light;
                localStorage.setItem('userPreference', JSON.stringify(this.userPreference));
                this.setTheme(isDark);
            }
        });
        // check initial screen size
        this.checkScreenSize();
    }

    ngOnDestroy(): void {
    }

    @HostListener('window:resize')
    onResize(): void {
        this.checkScreenSize();
    }

    private checkScreenSize(): void {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.isScreenTooSmall = this.screenWidth < this.MIN_WIDTH || this.screenHeight < this.MIN_HEIGHT;
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.userPreference.theme = this.darkMode ? ThemeType.Dark : ThemeType.Light;
        localStorage.setItem('userPreference', JSON.stringify(this.userPreference));
        this.setTheme(this.darkMode);
        this.themeService.setDarkMode(this.darkMode);
    }

    private setTheme(isDark: boolean) {
        const html = document.documentElement;
        if (isDark) {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }
}
