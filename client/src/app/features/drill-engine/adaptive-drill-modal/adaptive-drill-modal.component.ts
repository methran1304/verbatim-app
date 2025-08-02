import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-adaptive-drill-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzTagModule
  ],
  templateUrl: './adaptive-drill-modal.component.html',
  styleUrl: './adaptive-drill-modal.component.scss'
})
export class AdaptiveDrillModalComponent {
  @Input() isVisible: boolean = false;
  @Input() errorProneWords: string[] = [];
  @Input() isLoading: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
} 