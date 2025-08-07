import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-settings-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-settings-toolbar.component.html',
  styleUrl: './room-settings-toolbar.component.scss',
})
export class RoomSettingsToolbarComponent implements OnInit {
  @Input() drillType: string = 'Timed';
  @Input() difficulty: string = 'Intermediate';
  @Input() duration: string = '60s';

  ngOnInit(): void {
    console.log(this.drillType);
    console.log(this.difficulty);
    console.log(this.duration);
    console.log('RoomSettingsToolbarComponent initialized');
  }
}
