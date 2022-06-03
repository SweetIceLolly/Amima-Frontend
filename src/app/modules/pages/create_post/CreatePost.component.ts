import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";
import { HashtagBarComponent } from '../../elements/hashtag_bar/HashtagBar.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent {
  post : Post = new Post();
  images: string[] = [];
  hashtags: string[] = [];
  inputText = "";
  titleText = "";
  txtLimit = 2000;
  postParam = "";
  modeParam = "";

  constructor(
    private postCtrl: PostController,
    private UserCtrl: UserController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params["post"]);
      console.log(params["mode"]);
      this.modeParam = params['mode'];
      this.postParam = params['post'];
      console.log(this.modeParam);
      console.log(this.postParam);
    });
  }

  goToPostPage() {
    this.router.navigateByUrl('/');
    window.scroll(0, 0);
  }

  ngOnDestroy() {

  }

  updateKeywords(hashtags: string[]) {
    this.hashtags = hashtags;
  }

  updateImages(images: string[]) {
    this.images = images;
  }

  createPost() {
    let post = new Post();
    post.title = this.titleText;
    post.content = this.inputText;
    post.keywords = this.hashtags;
    post.images = this.images;

    if (!this.UserCtrl.isUserLoggedIn){
      console.log("ERROR");
      return;
    }

    if (post.title == "" || post.content == "" || post.images.length < 1 ||
     post.images.length > 10 || post.title.length > 25 || post.content.length > 2000 ||
     post.keywords.length > 10) {
      console.log("ERROR");
      return;
     }

    this.postCtrl.createPost(post)
      .then(() => {
        alert('OK!');
      })
      .catch(err => {
        alert(err);
      });
  }
}
