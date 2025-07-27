import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ZorroNotificationServiceTsService } from '../../../shared/zorro-notification.service.ts.service';
import { ErrorHandlerUtil } from '../../../core/utils/error-handler.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  isDarkMode = false;
  submitted = false;
  canSubmit = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService
  ) {
    this.loginForm = this.fb.group({
      emailAddressOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = this.getValidationMessage();
      return;
    }
    this.errorMessage = '';
    this.loading = true;
    const creds = this.loginForm.value;
    this.authService.login(creds).subscribe({
      next: (result) => {
        this.notificationService.createNotification('success', 'Welcome back!', 'You\'ve successfully logged in.');
        this.router.navigate(['/drill']);
        this.loading = false;
      },
      error: (result) => {
        const errorMessage = ErrorHandlerUtil.handleError(result, 'auth');
        this.notificationService.createNotification('error', 'Something went wrong!', errorMessage);
        this.loading = false;
        this.errorMessage = errorMessage;
      },
    });
  }
  
  onForgotPassword(): void {
    // TODO: Implement forgot password
  }

  onSignUp(): void {
    this.router.navigate(['/auth/register']);
  }

  get emailAddressOrUsername() { return this.loginForm.get('emailAddressOrUsername'); }
  get password() { return this.loginForm.get('password'); }

  getValidationMessage(): string {
    if ((this.emailAddressOrUsername?.invalid && (this.emailAddressOrUsername?.touched || this.submitted))) {
      if (this.emailAddressOrUsername.errors?.['required']) return 'Email or username is required.';
    }
    if ((this.password?.invalid && (this.password?.touched || this.submitted))) {
      if (this.password.errors?.['required']) return 'Password is required.';
      if (this.password.errors?.['passwordInvalid']) return 'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.';
    }
    return '';
  }
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  if (!value) return null;
  const valid = /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && value.length >= 8;
  return valid ? null : { passwordInvalid: true };
} 