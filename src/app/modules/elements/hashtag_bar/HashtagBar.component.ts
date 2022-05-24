import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
    selector: 'HashtagBar',
    template: `<tag-input [(ngModel)]='items'></tag-input>`,
    templateUrl: './HashtagBar.component.html',
    styleUrls: ['./HashtagBar.component.css']
})
export class HashtagBarComponent {
    items = ['Pizza', 'Pasta', 'Parmesan'];
    @Input() user: User = new User();
    constructor() {

    }

    getTextBox() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}