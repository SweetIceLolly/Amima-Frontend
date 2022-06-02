import { Component, EventEmitter, Output } from '@angular/core';
import { TagModel } from "ngx-chips/core/tag-model";

@Component({
    selector: 'HashtagBar',
    templateUrl: './HashtagBar.component.html',
    styleUrls: ['./HashtagBar.component.css']
})
export class HashtagBarComponent {

    @Output() changeEvent = new EventEmitter<string[]>();

    items = [];

    constructor() {

    }

    emitter() {
      this.changeEvent.emit(this.items.map((item: any) => item.value));
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
