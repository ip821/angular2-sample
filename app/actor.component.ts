import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router, RouteConfig, RouterOutlet, RouteParams} from 'angular2/router';
import {ActorService, IActor} from "../services/actor.service";

@Component({
    directives: [RouterOutlet],
    providers: [ActorService],
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Actor</h3>
        </div>
        <div class="panel-body">
            <form (ngSubmit)="onSubmit()" #actorForm="ngForm">
                <div>
                    <div>
                        <div class="form-group">
                            <label for="firstName">First name</label>
                            <input type="text" class="form-control" required [(ngModel)]="_actor.firstName" ngControl="firstName" #firstName="ngForm">
                            <div [hidden]="firstName.valid || firstName.pristine" class="alert alert-danger">
                            Field is required
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last name</label>
                            <input type="text" class="form-control" required [(ngModel)]="_actor.lastName" ngControl="lastName" #lastName="ngForm">
                            <div [hidden]="lastName.valid || lastName.pristine" class="alert alert-danger">
                            Field is required
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="username">User name</label>
                            <input type="text" class="form-control" required [(ngModel)]="_actor.username" ngControl="username" #username="ngForm">
                            <div [hidden]="username.valid || username.pristine" class="alert alert-danger">
                            Field is required
                            </div>
                        </div>                        
                    </div>
                </div>
                <button type="submit" class="btn btn-default" [disabled]="!actorForm.form.valid">Submit</button>
            </form>
        </div>
    </div>    
    `
})
export class ActorComponent {

    private _index: number;
    private _actor: IActor = { firstName: "", lastName: "", username: "" };

    constructor(private _routeParams: RouteParams, private _actorService: ActorService, private _router: Router) {
        this._index = +this._routeParams.get('index');

        _actorService.getActors().subscribe(
            data => this._actor = data[this._index],
            error => console.log(error)
        );
    }

    onSubmit = () => {
        this._actorService.saveActor(this._index, this._actor);
        this._router.navigate(['ActorsList', {index: this._index}]);
    }
}