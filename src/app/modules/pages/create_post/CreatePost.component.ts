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
  post: Post = new Post();
  images: any[] = [];
  hashtags: string[] = [];
  prevHashtags: any[] = [];
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
      this.modeParam = params['mode'];
      this.postParam = params['post'];
    });
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

  goToPostPage() {
    this.router.navigateByUrl('/');
    window.scroll(0, 0);
  }

  ngOnDestroy() {

  }

  myFunction() {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    if (x)
      x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      if (x)
        x.className = x.className.replace("show", "");
    }, 3000);

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

    if (this.post.title == "" || this.post.content == "" || this.post.images.length < 1 ||
      this.images.length > 10 || this.post.title.length > 150 || this.post.content.length > 2000 ||
      this.hashtags.length > 10) {

      alert("Please fill in all the fields correctly");
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
