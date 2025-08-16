import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrillType } from '../../models/enums/drill-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentDrillType$ = new BehaviorSubject<DrillType | null>(null);
  private currentSection$ = new BehaviorSubject<string>('drills');

  setCurrentDrillType(drillType: DrillType) {
    this.currentDrillType$.next(drillType);
  }

  getCurrentDrillType() {
    return this.currentDrillType$.asObservable();
  }

  setCurrentSection(section: string) {
    this.currentSection$.next(section);
  }

  getCurrentSection() {
    return this.currentSection$.asObservable();
  }

  getDrillTypeLabel(drillType: DrillType): string {
    switch (drillType) {
      case DrillType.Timed:
        return 'Timed';
      case DrillType.Marathon:
        return 'Marathon';
      case DrillType.Adaptive:
        return 'Adaptive';
      default:
        return 'Unknown';
    }
  }
} 