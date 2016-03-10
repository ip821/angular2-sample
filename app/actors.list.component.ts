import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {ActorService, IActor} from "../services/actor.service";

@Component({
    directives: [RouterOutlet],
    providers: [ActorService], 
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Actors</h3>
        </div>
        <div class="panel-body">
            <table class="table">
                <thead>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </thead>
                <tbody>
                    <tr *ngFor="#actor of _actors">
                        <td>{{actor.firstName}}</td>
                        <td>{{actor.lastName}}</td>
                        <td>{{actor.username}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class ActorsListComponent {
    private _actors: IActor[];
    constructor(private _actorService: ActorService){
        _actorService.getActors().subscribe(
            data => this._actors = data,
            error => console.log(error)
        );
    }
}