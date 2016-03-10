import {Component} from 'angular2/core';

@Component({
    selector: "dynamic-component",
    template:`
    <div>{{tabNumber}}</div>
    `
})
export class TabContentComponent{
    tabNumber = 0;
    
    constructor(){
        
    }
}