import {Component, ViewChildren, DynamicComponentLoader, Injector, ElementRef, AfterViewInit, QueryList}  from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TabDynamicComponent, ITabDynamicDescriptor} from "./tabdynamic.component";
import {TabContentComponent} from "./tabcontent.component";
import jquery = require("jquery");

@Component({
    selector: "tab-component",
    providers: [TabDynamicComponent],
    directives: [CORE_DIRECTIVES, TabDynamicComponent],
    template: `
        <dynamic-component></dynamic-component>
        <ul class="nav nav-tabs">
            <li *ngFor="#tabz of _tabs; #i=index" role="presentation" [class.active]="tabz.active == true"><a href="#" id="{{i}}" (click)="onSelect($event, i)">{{tabz.title}}</a></li>
        </ul>
        <div>
            <div *ngFor="#tabz of _tabs; #i=index" [class.hidden]="!_tabs[i].active">
                <dynamic-tab></dynamic-tab>
            </div>
        </div>
    `
})
export class TabComponent implements AfterViewInit {

    tabNumber: number;

    public _tabs: ITabDynamicDescriptor[] = [
        { title: 'Details', active: true, type: TabContentComponent, index: 0 },
        { title: 'Orders', active: false, type: TabContentComponent, index: 1 }
    ];

    @ViewChildren(TabDynamicComponent) _tabComponents: QueryList<TabDynamicComponent>;

    constructor(private _dcl: DynamicComponentLoader, private _injector: Injector, private _elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        var array = this._tabComponents.toArray();
        for (var index = 0; index < array.length; index++) {
            var descriptor = this._tabs[index];
            array[index].setDescriptor(descriptor);
            if (descriptor.active) {
                this.activateTab(index);
            }
        }
    }

    onSelect = ($event: Event, index: number) => {
        $event.preventDefault();
        this._tabs.forEach(c => c.active = false);
        this._tabs[index].active = true;
        this.activateTab(index);
    }

    activateTab = (index: number) => {
        this._tabComponents.toArray()[index].onActivate();
    }
}