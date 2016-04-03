import {Injectable} from "angular2/core";
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

export interface IActor {
    id: number;
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
            .get("/api/db")
            .map(res => <IActor[]>res.json())
            .do(actors => console.log(actors));
    }

    saveActor(index: number, actor: IActor) {
        return this._http.post("/api/db", JSON.stringify(actor));
    }
} 