import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, NzCardModule, NzButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(public router: Router) {}

  isLoginRoute() {
    return this.router.url === '/auth/login';
  }
}
