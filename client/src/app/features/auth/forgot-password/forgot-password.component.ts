import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZorroNotificationServiceTsService } from '../../../shared/zorro-notification.service';
import { ErrorHandlerUtil } from '../../../core/utils/error-handler.util';
import { AuthFooterComponent } from '../../../shared/auth-footer/auth-footer.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFooterComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  loading = false;
  isDarkMode = false;
  submitted = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService
  ) {
    this.forgotPasswordForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]]
    });
    
    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    const email = this.forgotPasswordForm.value.emailAddress;
    
    this.authService.forgotPassword(email).subscribe({
      next: (result) => {
        this.emailSent = true;
        this.notificationService.createNotification(
          'success', 
          'Email Sent!', 
          'If an account with that email exists, a password reset link has been sent.'
        );
        this.loading = false;
      },
      error: (error) => {
        const errorMessage = ErrorHandlerUtil.handleError(error, 'auth');
        this.notificationService.createNotification('error', 'Something went wrong!', errorMessage);
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

  get emailAddress() { return this.forgotPasswordForm.get('emailAddress'); }

  getValidationMessage(): string {
    if ((this.emailAddress?.invalid && (this.emailAddress?.touched || this.submitted))) {
      if (this.emailAddress.errors?.['required']) return 'Email address is required.';
      if (this.emailAddress.errors?.['email']) return 'Please enter a valid email address.';
    }
    return '';
  }
}
