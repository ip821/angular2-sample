import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouteParams} from 'angular2/router';

@Component({
    directives: [RouterOutlet],
    template : `
    ` 
})
export class ActorComponent{
    constructor(private _routeParams:RouteParams){
        let index = this._routeParams.get('index');
    }
}