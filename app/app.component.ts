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
    <alert type="info">Actor Application</alert>
    <nav>
        <ul class="nav nav-pills">
            <li role="presentation" [class.active]="router.isRouteActive(router.generate(['ActorsList']))"><a [routerLink]="['ActorsList']">Actors</a></li>
            <li role="presentation" [class.active]="router.isRouteActive(router.generate(['About']))"><a [routerLink]="['About']">About</a></li>
        </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
})
@RouteConfig([
    { path: '/actors-list', name: 'ActorsList', component: ActorsListComponent },
    { path: '/actor/:id', name: 'Actor', component: ActorComponent },
    { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent {
    constructor(private router: Router) {
    }
}