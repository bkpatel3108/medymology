import {Component} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MedymologyAppComponent} from './medymology.component';
import {AddWordComponent} from './addWord/addWord.component';
import {TempComponent} from './temp.component';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
//import {RouteConfig, RouterLink, Router} from '@angular/router-deprecated';
 
@Component({
    moduleId: module.id,
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthenticationService],
    // template: `
    //         <router-outlet><medymology-app></medymology-app><my-app-newword></my-app-newword><login-form></login-form><temp></temp></router-outlet>
    //     `
    template: `
            <nav>
                <a [routerLink]="['/home']">Home</a>
                <a [routerLink]="['/login']">Log In</a>
                <a (click)="logout()">Log Out</a>
            </nav>
            <router-outlet></router-outlet>
        `
})
@Routes([
    { path: '/home', component: MedymologyAppComponent},
    { path: '/login', component: LoginComponent},
    { path: '/addWord', component: AddWordComponent},
    { path: '/temp', component: TempComponent},
    { path: '', component: MedymologyAppComponent},
])

export class AppComponent{

     constructor(
        private _service:AuthenticationService){}

    logout(){
       this._service.logout();
    }

}