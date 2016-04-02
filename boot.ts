///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app/app.component'
import {provide}    from "angular2/core";
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, RequestOptions, Headers, BaseRequestOptions} from 'angular2/http';
import 'rxjs/Rx';

export class CustomRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, 
    HTTP_PROVIDERS,
    provide(RequestOptions, { useClass: CustomRequestOptions }),
    ]);