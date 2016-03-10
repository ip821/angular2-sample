import {Component} from 'angular2/core';
import {ITabDynamicContentSupport, ITabDynamicDescriptor} from "./tabdynamic.component";

@Component({
    selector: "dynamic-component",
    template: `
    <div>{{_tabNumber}}</div>
    `
})
export class TabContentComponent implements ITabDynamicContentSupport {
    _tabNumber = 0;

    constructor() {

    }
    
    setDescriptor = (descriptor: ITabDynamicDescriptor) => {
        this._tabNumber = descriptor.index;
    }
}