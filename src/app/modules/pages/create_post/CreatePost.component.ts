import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent {
  post : Post = new Post();
  pastPost: Post = new Post();
  images: any[] = [];
  hashtags: string[] = [];
  prevHashtags: any[] = [];
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
    });
    this.postCtrl.getPostInfo(this.postParam)
      .then((post: Post) => {
        this.pastPost = post;
        for (let img of post.images) {
          this.images.push({
            src: `${environment.postImageUrl}/${img}`,
            filename: img,
            uploadFailed: false
          });
        }
        for (let tag of post.keywords) {
          this.prevHashtags.push({
            display: tag,
            value: tag
          })
        }
      });
  }

  goToPostPage() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {

  }

  updateKeywords(hashtags: string[]) {
    this.hashtags = hashtags;
  }

  updateImages(images: any[]) {
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
        console.log(err);
      });
  }
}