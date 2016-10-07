import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {tasksRouting} from "./user.routing";
import {TaskComponent} from "./userDashboard/user-dashboard.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        tasksRouting

    ],
    declarations:[
        TaskComponent
    ],
    providers: []

})
export class TasksModule {}