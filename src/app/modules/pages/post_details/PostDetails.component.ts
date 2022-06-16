import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { Comment }  from 'src/app/models/Comment';
import { CommentController } from 'src/app/controllers/comment.controller';
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
  currentUser: User = new User();
  post: Post = new Post();
  isPoster: boolean = false;
  isFavourite: boolean = false;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faStarRegular = faStarRegular;
  faStarSolid = faStarSolid;
  commentContent: string = '';
  postsComments: Comment[] = [];
  profileImgUrl: string = environment.profileImageUrl;
  profileImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCtrl : UserController,
    private postCtrl: PostController,
    private commentCtrl: CommentController
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

          this.userCtrl.checkFavourite(this.postId).then(res => {
            this.isFavourite = res;
          });
        })
        .catch(err => {
          console.log(err);
        });
      
      this.commentCtrl.getComment(this.postId)
        .then((comments: Comment[]) => {
          this.postsComments = comments;
        })
      this.userCtrl.getUserInfo(this.userCtrl.getLoggedInUser() as string)
        .then((user: User) => {
          this.currentUser = user;
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
    this.userCtrl.addFavourite(this.postId)
      .then(user => {
        this.isFavourite = true;
      });
  }

  deleteFavourite() {
    this.userCtrl.deleteFavourite(this.postId)
      .then(user => {
        this.isFavourite = false;
      });
  }
  
  createComment() {
    this.commentCtrl.postComment(this.postId, this.commentContent)
      .then((comment: Comment) => {
        this.postsComments.push(comment);
        this.commentContent = '';
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  
  cancelComment() {
    this.commentContent = '';
  }

  getProfileImageUrl(user: User) {
    return environment.profileImageUrl + '/' + user.profile_image;
  }
}
