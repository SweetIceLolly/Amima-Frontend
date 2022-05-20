import { Component, NgModule } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from 'src/app/controllers/post.controller';

@Component({
  selector: 'CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent {
  post : Post = new Post();
  inputText = "";
  titleText = "";
  txtLimit = 2000;

  constructor(private postCtrl: PostController) {

  }

  create() {
    this.post.title = this.titleText;
    this.post.content = this.inputText;
    this.post.keywords = [];
    this.post.images = [];
    this.postCtrl.createPost(this.post);
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
