import {Component} from 'angular2/core';
import {Router, RouteData, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {AboutComponent} from "./about.component";
import {ActorComponent} from "./actor.component";
import {ActorsListComponent} from "./actors.list.component";

@Component({
    selector: 'my-app',
    directives: [Alert, ROUTER_DIRECTIVES],
    template: `
    <nav class="navbar navbar-default">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
        <a class="navbar-brand" href="#">Actors App</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li role="presentation" [class.active]="router.isRouteActive(router.generate(['ActorsList']))"><a [routerLink]="['ActorsList']">Actors</a></li>
                <li role="presentation" [class.active]="router.isRouteActive(router.generate(['About']))"><a [routerLink]="['About']">About</a></li>
            </ul>
        </div>
    </div>
    </nav>
        <router-outlet></router-outlet>
  `,
})
@RouteConfig([
    { path: '/actors-list', name: 'ActorsList', component: ActorsListComponent, useAsDefault: true },
    { path: '/actor/:id', name: 'Actor', component: ActorComponent },
    { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent {
    constructor(private router: Router) {
    }
}