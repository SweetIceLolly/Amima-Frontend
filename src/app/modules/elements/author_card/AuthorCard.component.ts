import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
    selector: 'AuthorCard',
    templateUrl: './AuthorCard.component.html',
    styleUrls: ['./AuthorCard.component.css']
})
export class AuthorCardComponent {
    @Input() user: User = new User();
    constructor() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
