import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'HashtagBar',
  template: `<tag-input [(ngModel)]='items'></tag-input>`,
  templateUrl: './HashtagBar.component.html',
  styleUrls: ['./HashtagBar.component.css']
})
export class HashtagBarComponent {

  @Output() changeEvent = new EventEmitter<any[]>();

  items = [];

  constructor() {

  }

  emitter() {
    const exp1: RegExp = new RegExp("^[a-zA-Z0-9-_.]*$");
    const exp2: RegExp = new RegExp("^[-_.]*$");
    const x: string = (this.items[this.items.length - 1] as any).value;

    if (exp1.test(x)) {
      if (x.length > 1 && (!exp2.test(x))) {
        this.changeEvent.emit(this.items);
      }
      else if(x.length == 1 && (!exp2.test(x))) {
        this.changeEvent.emit(this.items);
      }
      else {
        this.items.pop()
      }
    }
    else {
      this.items.pop()
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}