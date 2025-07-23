import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DrillEngineComponent } from './features/drill-engine/drill-engine.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './auth.guard';
import { redirectIfAuthenticatedGuard } from './auth-redirect.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [redirectIfAuthenticatedGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ],
    },
    {
        path: 'drill',
        component: DrillEngineComponent,
        canActivate: [authGuard],
    },
    {
        path: 'leaderboard',
        component: ProfileComponent, // TODO: Replace with LeaderboardComponent
        canActivate: [authGuard],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];
