import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export interface IActor {
    first_name: string;
    last_name: string;
    username: string;
}

@Injectable()
export class ActorService {

    constructor(private _http: Http) {

    }

    getActors(): Observable<IActor[]> {
        
        return this._http
            .get("/db")
            .map(res => <IActor[]>res.json());
    }

    saveActor(index: number, actor: IActor) {
        return this._http.post("/db", JSON.stringify(actor));
    }
} 