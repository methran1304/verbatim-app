import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZorroNotificationServiceTsService } from '../../../shared/zorro-notification.service';
import { ErrorHandlerUtil } from '../../../core/utils/error-handler.util';
import { AuthFooterComponent } from '../../../shared/auth-footer/auth-footer.component';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { GoogleCredentialResponse } from '../../../models/interfaces/google-auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthFooterComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  isDarkMode = false;
  submitted = false;
  private googleCredentialSubscription: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService,
    private googleAuthService: GoogleAuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), usernameValidator]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
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
    
    this.loading = true;
    this.authService.googleSignIn(response.credential, true).subscribe({
      next: (result) => {
        this.notificationService.createNotification('success', 'Welcome!', 'Successfully signed up with Google.');
        this.router.navigate(['/drill']);
        this.loading = false;
      },
      error: (error) => {
        const errorMessage = ErrorHandlerUtil.handleError(error, 'auth');
        this.notificationService.createNotification('error', 'Google Sign-Up Failed', errorMessage);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = this.getValidationMessage();
      return;
    }
    this.errorMessage = '';
    this.loading = true;
    const creds = this.registerForm.value;
    this.authService.register(creds).subscribe({
      next: (result) => {
        this.notificationService.createNotification('success', 'Account created! ', 'Your account has been created successfully. Let\'s get started!');
        this.router.navigate(['/auth/login']);
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

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }



  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('emailAddress'); }
  get password() { return this.registerForm.get('password'); }

  getValidationMessage(): string {
    if ((this.username?.invalid && (this.username?.touched || this.submitted))) {
      if (this.username.errors?.['required']) return 'Username is required.';
      if (this.username.errors?.['minlength']) return 'Username must be at least 4 characters.';
      if (this.username.errors?.['usernameInvalid']) return 'Username can only contain letters, numbers, and underscores, and no spaces.';
    }
    if ((this.email?.invalid && (this.email?.touched || this.submitted))) {
      if (this.email.errors?.['required']) return 'Email is required.';
      if (this.email.errors?.['email']) return 'Please enter a valid email address.';
    }
    if ((this.password?.invalid && (this.password?.touched || this.submitted))) {
      if (this.password.errors?.['required']) return 'Password is required.';
      if (this.password.errors?.['passwordInvalid']) return 'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.';
    }
    return '';
  }
}

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  if (!value) return null;
  const valid = /^[A-Za-z0-9_]+$/.test(value) && !/\s/.test(value);
  return valid ? null : { usernameInvalid: true };
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  if (!value) return null;
  const valid = /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && value.length >= 8;
  return valid ? null : { passwordInvalid: true };
}

 