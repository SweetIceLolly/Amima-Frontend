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

  constructor() { }

  removeInvalidChars(text: string) {
    return text.replace(/[\s/\\]/g, '-');
  }

  emitter() {
    // Allow only 10 keywords
    this.items = this.items.slice(0, 10);

    // Check for invalid keywords
    for (let item of this.items) {
      const newValue: string = this.removeInvalidChars(((item as any).value as string).slice(0, 10));
      (item as any).display = newValue;
      (item as any).value = newValue;
    }
    this.changeEvent.emit(this.items.map(item => (item as any).value));
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
