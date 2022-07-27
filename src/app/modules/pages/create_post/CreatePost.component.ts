import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";
import { GeneralController } from "../../../controllers/general.controller";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent {
  post: Post = new Post();
  images: any[] = [];
  hashtags: string[] = [];
  prevHashtags: any[] = [];
  txtLimit = 2500;
  postParam = "";
  modeParam = "";
  categories: Array<string>= ['For You', 'Food', 'Fashion', 'Technology', 'Lifestyle', 'University'];
  category: string = 'For You';

  constructor(
    private postCtrl: PostController,
    private UserCtrl: UserController,
    private genCtrl: GeneralController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modeParam = params['mode'];
      this.postParam = params['post'];
    });
    if (this.modeParam == "edit" && this.postParam) {
      this.postCtrl.getPostInfo(this.postParam)
        .then((post: Post) => {
          this.post = post;
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

  updateImages(images: any[]) {
    this.images = images;
  }

  createPost() {
    this.post.keywords = this.hashtags;
    this.post.images = this.images.map(img => img.filename);

    if (!this.UserCtrl.isUserLoggedIn){
      alert("You must be logged in to create a post");
      return;
    }

    if (this.post.title == "") {
      this.genCtrl.showMessageToast("Please enter a title");
      return;
    }

    if (this.post.content == "") {
      this.genCtrl.showMessageToast("Please enter your review");
      return;
    }

    if (this.post.images.length < 1) {
      this.genCtrl.showMessageToast("Please upload some images of the product");
      return;
    }

    if (this.images.length > 10) {
      this.genCtrl.showMessageToast("Cannot upload more than 10 images");
      return;
    }

    if (this.post.content.length > 2500) {
      this.genCtrl.showMessageToast("Can only enter at most 2500 characters in your review");
      return;
    }

    if (this.post.title.length > 150) {
      this.genCtrl.showMessageToast("Can only enter at most 150 characters in your title");
      return;
    }

    if (this.hashtags.length > 10) {
      this.genCtrl.showMessageToast("Can only enter 10 hashatgs");
      return;
    }

    if (this.modeParam == "edit") {
      this.postCtrl.editPost(this.post)
        .then(() => {
          window.location.href = '/post/' + this.postParam;
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      this.postCtrl.createPost(this.post)
        .then(() => {
          window.location.href = '/';
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
