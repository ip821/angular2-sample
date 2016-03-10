import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

@Component({
    directives: [RouterOutlet],
    template : `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">About</h3>
        </div>
        <div class="panel-body">
        Sample app about actors and orders
        </div>
    </div>
    `
})
export class AboutComponent{
    
}