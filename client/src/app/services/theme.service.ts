import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode$ = new BehaviorSubject<boolean>(false);

  setDarkMode(isDark: boolean) {
    this.darkMode$.next(isDark);
  }

  getDarkMode() {
    return this.darkMode$.asObservable();
  }
} 