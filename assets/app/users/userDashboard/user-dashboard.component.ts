import {Component} from "@angular/core";
import {User} from "../../authentication/user.model";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'my-task',
    templateUrl:'user-dashboar.componet.html',
    styleUrls: ['../../commonStyles/select2.min.css', '../../commonStyles/select2-bootstrap.min.css','../../commonStyles/login.min.css']
})
export class DashboardComponent{
    _user: User;
    userFirstName: String;
    constructor(private _authService: AuthService, private _router: Router){}
    OnSubmit() {
        // this._authService.signin(this._user)
        //     .subscribe(
        //         data => {
        //             localStorage.setItem('token', data.token);
        //             localStorage.setItem('UserId', data.user);
        //             localStorage.setItem('role', data.role);
        //             this._router.navigateByUrl('/task');
        //         }
        //     );
       // this._user = new User("","","","","");

    }
    ngOnInit() {
        if(this.isLogedIn()) {
            this._user = new User("", "", "", "", "");
            this._authService.getUserByLogin(localStorage.getItem('email')).subscribe(
                data => {
                    this._user = data.user;
                    this.userFirstName = this._user.firstName;
                }
            );
        } else{
            this._router.navigateByUrl('');
        }
    }

    isLogedIn(){
        return this._authService.isLoggedIn();
    }
    onLogout(){
        this._authService.logout();
        this._router.navigate(['']);
    }
    isAdmin(){
        //stub code to be changed
        return true;
    }
}