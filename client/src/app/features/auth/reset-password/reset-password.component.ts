import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZorroNotificationServiceTsService } from '../../../shared/zorro-notification.service';
import { ErrorHandlerUtil } from '../../../core/utils/error-handler.util';
import { AuthFooterComponent } from '../../../shared/auth-footer/auth-footer.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFooterComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading = false;
  isDarkMode = false;
  submitted = false;
  passwordReset = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
    
    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnInit(): void {
    // Get token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    //   if (!this.token) {
    //     this.notificationService.createNotification('error', 'Invalid Reset Link', 'The password reset link is invalid or has expired.');
    //     this.router.navigate(['/auth/login']);
    //   }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    const { newPassword, confirmPassword } = this.resetPasswordForm.value;
    
    this.authService.resetPassword(this.token, newPassword, confirmPassword).subscribe({
      next: (result) => {
        this.passwordReset = true;
        this.notificationService.createNotification(
          'success', 
          'Password Reset Successfully!', 
          'Your password has been reset. You can now log in with your new password.'
        );
        this.loading = false;
      },
      error: (error) => {
        const errorMessage = ErrorHandlerUtil.handleError(error, 'auth');
        this.notificationService.createNotification('error', 'Password Reset Failed', errorMessage);
        this.loading = false;
      },
    });
  }

  onBackToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onLogoClick(): void {
    this.router.navigate(['/drill']);
  }

  get newPassword() { return this.resetPasswordForm.get('newPassword'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  getValidationMessage(): string {
    if ((this.newPassword?.invalid && (this.newPassword?.touched || this.submitted))) {
      if (this.newPassword.errors?.['required']) return 'New password is required.';
      if (this.newPassword.errors?.['passwordInvalid']) return 'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.';
    }
    if ((this.confirmPassword?.invalid && (this.confirmPassword?.touched || this.submitted))) {
      if (this.confirmPassword.errors?.['required']) return 'Please confirm your password.';
    }
    if (this.resetPasswordForm.errors?.['passwordMismatch'] && this.submitted) {
      return 'Passwords do not match.';
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

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  
  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  
  return null;
}
