import { Component, OnInit } from '@angular/core';
import { DrillTextComponent } from './drill-text/drill-text.component';
import { DrillDifficulty } from '../../models/enums/drill-difficulty.enum';
import { DrillLength } from '../../models/enums/drill-length.enum';
import { DrillInputComponent } from './drill-input/drill-input.component';
import { DrillTextService } from '../../services/drill-text.service';

@Component({
  selector: 'app-drill-engine',
  imports: [DrillTextComponent, DrillInputComponent],
  templateUrl: './drill-engine.component.html',
  styleUrl: './drill-engine.component.scss'
})
export class DrillEngineComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
