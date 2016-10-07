import {Component, Injectable, OnInit} from "@angular/core";
import {User} from "../user.model";
import {AuthService} from "../auth.service";
@Component({
    moduleId: module.id,
    selector: 'my-signup',
    templateUrl: 'signup.component.html'
})
@Injectable()
export class SignUpComponent implements OnInit {
    constructor(private _authService: AuthService){}
    model: User;
    active = true;
    roles = ['admin', 'operator', 'manager'];
    OnSubmit() {
        this._authService.signup(this.model)
            .subscribe(
                data => console.log(data)
            );
        this.model = new User("","","","","operator");
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
    ngOnInit() {
        this.model = new User("","","","","operator");
    }
}