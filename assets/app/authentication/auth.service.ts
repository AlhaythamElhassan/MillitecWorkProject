import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "./user.model";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
@Injectable()
export class AuthService {
    constructor(private _http: Http){}

    signup(user: User){
        const body = JSON.stringify(user);
        const _headers = new Headers({'Content-Type': 'application/json'});
        _headers.set('auth', localStorage.getItem('token'));
        return this._http.post('user', body, {headers: _headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const _headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post('http://localhost:3000/user/login', body, {headers: _headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }
    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    isAdmin () {
        return localStorage.getItem('role') === 'admin';
    }
    getUserByLogin(email: string){
        const _headers = new Headers({'Content-Type': 'application/json'});
        _headers.set('auth', localStorage.getItem('token'));
        return this._http.get('http://localhost:3000/user/'+ localStorage.getItem('email'), {headers: _headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }
}