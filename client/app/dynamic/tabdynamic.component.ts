import {Component, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { Type } from 'angular2/src/facade/lang';
import {TabContentComponent} from "./tabcontent.component";

export interface ITabDynamicDescriptor {
    title: string;
    active: boolean;
    type: Type;
    index: number;
}

export interface ITabDynamicContentSupport {
    setDescriptor(descriptor: ITabDynamicDescriptor);
}

@Component({
    selector: "dynamic-tab",
    directives: [CORE_DIRECTIVES],
    template: `
        <div #child></div>
    `
})
export class TabDynamicComponent {
    private _loaded = false;
    private _descriptor: ITabDynamicDescriptor;

    constructor(private _elementRef: ElementRef, private _dcl: DynamicComponentLoader) {
    }

    setDescriptor(descriptor: ITabDynamicDescriptor) {
        this._descriptor = descriptor;
    }

    onActivate() {
        if (!this._loaded) {
            this._dcl.loadIntoLocation(this._descriptor.type, this._elementRef, "child")
                .then(c => <ITabDynamicContentSupport>c.instance)
                .then(c => c.setDescriptor(this._descriptor));
            this._loaded = true;
        }
    }
}