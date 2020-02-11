import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { LoginComponent } from '../../pages/admin/login/login.component';
import { RegisterComponent } from '../../pages/admin/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent, canActivate: [AuthGuard] }
];
