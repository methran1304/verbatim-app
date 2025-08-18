import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LogoutComponent } from './features/auth/logout/logout.component';
import { DrillEngineComponent } from './features/drill-engine/drill-engine.component';
import { DrillStatsComponent } from './features/drill-stats/drill-stats.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AIInsightsComponent } from './features/ai-insights/ai-insights.component';
import { ClassicsComponent } from './features/classics/classics.component';
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
        path: 'logout',
        component: LogoutComponent,
    },
    {
        path: 'drill',
        component: DrillEngineComponent,
        canActivate: [authGuard],
    },
    {
        path: 'drill-stats',
        component: DrillStatsComponent,
        canActivate: [authGuard],
    },
    {
        path: 'classics',
        component: ClassicsComponent,
        canActivate: [authGuard],
    },
    {
        path: 'guide',
        component: DrillEngineComponent, // TODO
        canActivate: [authGuard],
    },
    {
        path: 'ai-insights',
        component: AIInsightsComponent,
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
    {
        path: 'competitive-drill',
        component: DrillEngineComponent,
        canActivate: [authGuard],
        data: { isCompetitive: true }
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];
