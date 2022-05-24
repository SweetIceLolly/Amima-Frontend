import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'HashtagBar',
    template: `<tag-input [(ngModel)]='items'></tag-input>`,
    templateUrl: './HashtagBar.component.html',
    styleUrls: ['./HashtagBar.component.css']
})
export class HashtagBarComponent {

    @Output() changeEvent = new EventEmitter<any[]>();
    
    items = ['Pizza', 'Pasta', 'Parmesan'];
    
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