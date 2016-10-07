import {Component, Injectable} from "@angular/core";
import {AuthService} from "../auth.service";

@Component({
    moduleId: module.id,
    selector: 'my-auth',
    templateUrl: 'authentication.component.html',
    styleUrls: ['authentication.component.css']
})
@Injectable()
export class AuthenticationComponent {
    constructor(private _authService: AuthService){}

    isLogedIn(){
        return this._authService.isLoggedIn();
    }
    isAdmin() {
        return this._authService.isAdmin();
    }
}