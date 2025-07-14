import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
})
export class AuthComponent {
    constructor(public router: Router) {}

    switchTo(view: 'login' | 'register') {
        this.router.navigate(['/auth', view]);
    }
}
