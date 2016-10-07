import {Component, Injectable, OnInit} from "@angular/core";
import {User} from "../user.model";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../commonStyles/select2.min.css', '../../commonStyles/select2-bootstrap.min.css','../../commonStyles/login.min.css']
})
@Injectable()
export class LoginComponent implements OnInit{
    model: User;
    active = true;
    constructor(private _authService: AuthService, private _router: Router){}
    OnSubmit() {

        this._authService.signin(this.model)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('UserId', data.user);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('email', data.email);
                    this._router.navigateByUrl('/userDashboard');
                }
            );
        this.active = false;
        setTimeout(() => this.active = true, 0);
        this.model = new User("","","","","");
    }
    ngOnInit() {
        this.model = new User("","","","","");
    }
    isLogedIn(){
        return this._authService.isLoggedIn();
    }

}