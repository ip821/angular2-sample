import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';

export interface IActor {
    firstName: string;
    lastName: string;
    username: string;
}

@Injectable()
export class ActorService {

    constructor(private _http: Http) {

    }

    getActors() {
        return this._http
            .get("data/actors.json")
            .map(res => <IActor[]>res.json());
    }

} 