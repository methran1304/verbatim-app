import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, NzButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    loginForm!: FormGroup;
    loading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) return;

        this.loading = true;
        this.errorMessage = '';

        const creds = this.loginForm.value;

        this.authService.login(creds).subscribe({
            next: (result) => {
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);

                this.router.navigate(['/drill']);
            },
            error: (result) => {
                this.loading = false;
                this.errorMessage = result?.error || 'Login Failed';
            },
        });
    }
}
