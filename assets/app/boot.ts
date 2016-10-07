///<reference path="../../typings.d.ts"/>
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.modules';
import {enableProdMode} from "@angular/core";
const platform = platformBrowserDynamic();
enableProdMode(); // to enable production mode
platform.bootstrapModule(AppModule);