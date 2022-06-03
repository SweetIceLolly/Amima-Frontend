import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'AuthorCard',
    templateUrl: './AuthorCard.component.html',
    styleUrls: ['./AuthorCard.component.css']
})
export class AuthorCardComponent {
  @Input() user: User = new User();
  profileImgUrl: string = environment.profileImageUrl;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToProfilePage() {
    this.router.navigate(['/profile/' + this.user._id]);
    window.scroll(0, 0);
  }
}
