import { Component } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";

@Component({
  selector: 'Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(private postCtrl: PostController) {
  
  }

  ngOnInit() {
    this.posts = this.postCtrl.getNewestPosts()
  }

  ngOnDestroy() {

  }
}
