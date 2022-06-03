import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'AuthorCard',
    templateUrl: './AuthorCard.component.html',
    styleUrls: ['./AuthorCard.component.css']
})
export class AuthorCardComponent {
  @Input() user: User = new User();
  profileImgUrl: string = environment.profileImageUrl;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
