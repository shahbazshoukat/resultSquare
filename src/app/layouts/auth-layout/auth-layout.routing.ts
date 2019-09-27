import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/admin/login/login.component';
import { RegisterComponent } from '../../pages/admin/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'rs-admin/login',          component: LoginComponent },
    { path: 'rs-admin/register',       component: RegisterComponent }
];
