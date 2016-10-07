import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {tasksRouting} from "./user.routing";
import {DashboardComponent} from "./userDashboard/user-dashboard.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CreateUserComponent} from "./createUserComponent/create-user.component";
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        tasksRouting

    ],
    declarations:[
        DashboardComponent,
        CreateUserComponent
    ],
    providers: []

})
export class TasksModule {}