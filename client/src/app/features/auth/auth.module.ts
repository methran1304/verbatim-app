import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthComponent],
})
export class AuthModule {} 