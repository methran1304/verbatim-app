import { Component } from '@angular/core';
import { DrillEngineComponent } from '../drill-engine/drill-engine.component';

@Component({
  selector: 'app-competitive-drill',
  standalone: true,
  imports: [DrillEngineComponent],
  templateUrl: './competitive-drill.component.html',
  styleUrl: './competitive-drill.component.scss'
})
export class CompetitiveDrillComponent {

}
