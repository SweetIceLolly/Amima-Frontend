import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
    selector: 'CardScreen',
    templateUrl: './CardScreen.component.html',
    styleUrls: ['./CardScreen.component.css']
})
export class CardScreenComponent {
    @Input() posts: Post[] = [];

    constructor() {

    }

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }
}
