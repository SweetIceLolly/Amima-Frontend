import { Component, Input } from '@angular/core'
import { Post } from 'src/app/models/Post';
import { PostController } from 'src/app/controllers/post.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'Card',
  templateUrl: './Card.component.html',
  styleUrls: ['./Card.component.css']
})
export class CardComponent {
  @Input() postID: string = '';
  post: Post = new Post();

  constructor(private postCtrl: PostController, private router: Router) {

  }
  
  goToPostPage() {
    this.router.navigateByUrl('/post/' + this.postID);
  }

  goToProfilePage(){
    this.router.navigateByUrl('/profile/' + this.post.posterId);
  }

  ngOnInit() {
    this.postCtrl.getPostInfo(this.postID)
      .then(post => {
        this.post = post
      })
      .catch(err => {
        //this.router.navigateByUrl('/notfound');
      })
  }

  ngOnDestroy() {

  }
}
