/**
 * Angular 2 application entry point
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./headerComponent/header.componet";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {routing} from "./app.routing";
import {AuthMoudule} from "./authentication/auth.moudle";
import {TasksModule} from "./users/user.module";


@NgModule({
    imports:      [
        BrowserModule,
        routing,
        AuthMoudule,
        TasksModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,

    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
        ],
    bootstrap: [AppComponent]
})
export class AppModule {

}