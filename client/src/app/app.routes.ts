import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DrillEngineComponent } from './features/drill-engine/drill-engine.component';
import { authGuard } from './auth.guard';
import { redirectIfAuthenticatedGuard } from './auth-redirect.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [redirectIfAuthenticatedGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent,
                children: [],
            },
            {
                path: 'register',
                component: RegisterComponent,
                children: [],
            },
        ],
    },
    {
        path: 'drill',
        component: DrillEngineComponent,
        canActivate: [authGuard],
    },
    { path: '', redirectTo: 'drill', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];
