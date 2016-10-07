import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {TaskComponent} from "./userDashboard/user-dashboard.component";
const tasksRoutes: Routes = [
    {
        path: 'userDashboard',
        component: TaskComponent
    }
];

export const tasksRouting: ModuleWithProviders = RouterModule.forChild(tasksRoutes);