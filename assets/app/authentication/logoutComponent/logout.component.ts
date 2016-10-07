import {Component, Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'my-logout',
    templateUrl: 'logout.component.html'
})
@Injectable()
export class LogoutComponent {
    constructor(private _authService: AuthService, private _router: Router){}
    onLogout(){
        this._authService.logout();
        this._router.navigate(['']);
    }
}