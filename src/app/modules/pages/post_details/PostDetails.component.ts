import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { faPenToSquare, faTrashCan, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'PostDetails',
  templateUrl: './PostDetails.component.html',
  styleUrls: ['./PostDetails.component.css']
})
export class PostDetailsComponent {
  postId: string = '';
  user: User = new User();
  post: Post = new Post();
  isPoster: boolean = false;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faStarRegular = faStarRegular;
  faStarSolid = faStarSolid;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCtrl : UserController,
    private postCtrl: PostController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.postId = params['id'];

      this.postCtrl.getPostInfo(this.postId)
        .then((post: Post) => {
          this.post = post;
          this.user = post.posterId;
          this.isPoster = post.posterId._id === this.userCtrl.getLoggedInUser();

          // Pre-process post image paths
          for (let i = 0; i < this.post.images.length; i++) {
            this.post.images[i] = environment.postImageUrl + '/' + this.post.images[i];
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deletePost() {
    this.postCtrl.deletePost(this.post._id)
      .then(() => {
        this.router.navigate(['/']);
        window.scroll(0, 0);
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkIsUser() {
    return this.userCtrl.isUserLoggedIn()
  }

  goToEdit() {
    this.router.navigate(['/newpost'], { queryParams: { mode: 'edit', post: this.postId } });
    window.scroll(0, 0);
  }
  favouritePost() {
    this.userCtrl.addFavourite(this.postId);
  }

}


