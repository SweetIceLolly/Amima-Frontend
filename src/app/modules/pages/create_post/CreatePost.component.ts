import { Component } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";

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

  constructor(
    private postCtrl: PostController
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  createPost() {
    let post = new Post();
    post.title = "title";
    post.content = 'sdfds';
    post.keywords = ["keyword1", "keyword2", "keyword3", "keyword4"];
    post.images = ["image1", "image2", "image3"];

    this.postCtrl.createPost(post)
      .then(() => {
        alert('OK!');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
