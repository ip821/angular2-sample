import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

@Component({
    directives: [RouterOutlet],
    template : '<router-outlet></router-outlet>' 
})
export class ActorComponent{
    
}