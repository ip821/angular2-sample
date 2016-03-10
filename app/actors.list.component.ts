import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {ActorService} from "../services/actor.service";

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
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>user1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class ActorsListComponent {
    constructor(private actorService: ActorService){
        
    }
}