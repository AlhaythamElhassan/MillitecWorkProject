import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {DashboardComponent} from "./userDashboard/user-dashboard.component";
import {CreateUserComponent} from "./createUserComponent/create-user.component";
const tasksRoutes: Routes = [
    {
        path: 'userDashboard',
        component: DashboardComponent
    },
    {
        path: 'userDashboard',
        component: DashboardComponent,
        children: [
            {path: 'createNewUser', component:CreateUserComponent}
        ]
    }
];

export const tasksRouting: ModuleWithProviders = RouterModule.forChild(tasksRoutes);