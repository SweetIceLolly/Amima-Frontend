import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'HashtagBar',
    templateUrl: './HashtagBar.component.html',
    styleUrls: ['./HashtagBar.component.css']
})
export class HashtagBarComponent {

    @Output() changeEvent = new EventEmitter<any[]>();

    items = [];

    constructor() {

    }

    emitter() {
      this.changeEvent.emit(this.items);
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
