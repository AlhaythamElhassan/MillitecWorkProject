import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./loginComponent/login.component";
import {AuthenticationComponent} from "./authenticationComponent/authenticaiton.component";
import {SignUpComponent} from "./signUpComponent/signup.component";
import {LogoutComponent} from "./logoutComponent/logout.component";


const authRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            {path: '',component: LoginComponent},
            {path: 'Login',component: LoginComponent},
            {path:'SignUp', component: SignUpComponent},
            {path:'Logout', component: LogoutComponent}
        ]
    }
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);