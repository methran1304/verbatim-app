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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  isDarkMode = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private notificationService: ZorroNotificationServiceTsService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), usernameValidator]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: confirmPasswordValidator });
    this.themeService.getDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
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
        console.log(result?.error);
        this.notificationService.createNotification('success', 'Account created! ', 'Your account has been created successfully. Let’s get started!');
        this.router.navigate(['/auth/login']);
        this.loading = false;
      },
      error: (result) => {
        this.notificationService.createNotification('error', 'Something went wrong!', result?.error ?? 'Please try again later.');
        this.loading = false;
        this.errorMessage = result?.error || 'Registration Failed';
      },
    });
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('emailAddress'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

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
    if ((this.confirmPassword?.invalid && (this.confirmPassword?.touched || this.submitted))) {
      if (this.confirmPassword.errors?.['required']) return 'Please confirm your password.';
    }
    if (this.registerForm.errors?.['passwordsDontMatch'] && (this.confirmPassword?.touched || this.submitted)) {
      return 'Passwords do not match.';
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

export function confirmPasswordValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsDontMatch: true };
} 