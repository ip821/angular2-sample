import {Component, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TabContentComponent} from "./tabcontent.component";

@Component({
    selector: "dynamic-tab",
    directives: [CORE_DIRECTIVES],
    template:`
        <div #child></div>
    `
})
export class TabDynamicComponent{
    active = false;
    loaded = false;
    
    constructor(private _elementRef : ElementRef, private _dcl: DynamicComponentLoader) {
        
    }
    
    setActive(index: number) {
        this.active = true;
        if(!this.loaded){
            this._dcl.loadIntoLocation(TabContentComponent, this._elementRef, "child")
            .then(c => <TabContentComponent>c.instance)
            .then(c => c.tabNumber = index);
            this.loaded = true;
        }
    }
}