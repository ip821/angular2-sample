import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';

export interface IActor {
    firstName: string;
    lastName: string;
    username: string;
}

@Injectable()
export class ActorService {

    private static _actors: IActor[] = null;

    constructor(private _http: Http) {

    }

    getActors() {
        return this._http
            .get("data/actors.json")
            .map(res => {
                if(ActorService._actors == null){
                    ActorService._actors = <IActor[]>res.json();
                }
                return ActorService._actors;
            });
    }

    saveActor(index: number, actor: IActor) {
        ActorService._actors[index] = actor;
    }
} 