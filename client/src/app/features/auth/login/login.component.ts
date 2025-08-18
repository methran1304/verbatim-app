
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZorroNotificationServiceTsService } from '../../../shared/zorro-notification.service.ts.service';
import { ErrorHandlerUtil } from '../../../core/utils/error-handler.util';
import { AuthFooterComponent } from '../../../shared/auth-footer/auth-footer.component';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { GoogleCredentialResponse } from '../../../models/interfaces/google-auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  isDarkMode = false;
  submitted = false;
  canSubmit = false;
  private googleCredentialSubscription: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService,
    private googleAuthService: GoogleAuthService
  ) {
    this.loginForm = this.fb.group({
      emailAddressOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngAfterViewInit(): void {
    this.initializeGoogleSignIn();
  }

  ngOnDestroy(): void {
    if (this.googleCredentialSubscription) {
      this.googleCredentialSubscription.unsubscribe();
    }
    this.googleAuthService.destroy();
  }

  private async initializeGoogleSignIn(): Promise<void> {
    try {
      // initialize Google Sign-In
      await this.googleAuthService.initializeGoogleSignIn();
      
      // render the button
      const success = this.googleAuthService.renderButton('buttonDiv', {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: '400px'
      });
      if (!success) {
        this.notificationService.createNotification('error', 'Google Sign-In Error', 'Failed to render Google Sign-In button.');
        return;
      }

      // subscribe to credential responses
      this.googleCredentialSubscription = this.googleAuthService.getCredentialResponse()
        .subscribe(this.handleGoogleCredentialResponse.bind(this));

    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      this.notificationService.createNotification('error', 'Google Sign-In Error', 'Failed to initialize Google Sign-In.');
    }
  }

  private handleGoogleCredentialResponse(response: GoogleCredentialResponse): void {
    console.log("Encoded JWT ID token: " + response.credential);
    
    // TODO: Implement Google OAuth authentication
    // You would typically send this credential to your backend
    // this.authService.googleSignIn(response.credential).subscribe({
    //   next: (result) => {
    //     this.notificationService.createNotification('success', 'Welcome!', 'Successfully signed in with Google.');
    //     this.router.navigate(['/drill']);
    //   },
    //   error: (error) => {
    //     const errorMessage = ErrorHandlerUtil.handleError(error, 'auth');
    //     this.notificationService.createNotification('error', 'Google Sign-In Failed', errorMessage);
    //   }
    // });

    // temporary notification until backend integration is complete
    this.notificationService.createNotification('info', 'Google Sign-In', 'Google authentication received. Backend integration pending.');
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