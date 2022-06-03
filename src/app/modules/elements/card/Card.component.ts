import { Component, Input } from '@angular/core'
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'Card',
  templateUrl: './Card.component.html',
  styleUrls: ['./Card.component.css']
})
export class CardComponent {
  @Input() post: Post = new Post();

  postImgUrl: string = environment.postImageUrl;
  profileImgUrl: string = environment.profileImageUrl;

  constructor(private router: Router) { }

  goToPostPage() {
    this.router.navigateByUrl('/post/' + this.post._id);
  }

  goToProfilePage(){
    this.router.navigateByUrl('/profile/' + this.post.posterId._id);
  }
}
