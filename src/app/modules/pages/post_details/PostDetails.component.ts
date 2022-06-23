import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { GeneralController } from 'src/app/controllers/general.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { Comment }  from 'src/app/models/Comment';
import { CommentController } from 'src/app/controllers/comment.controller';
import { faPenToSquare, faTrashCan, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

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
  favCount: number = 0;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faStarRegular = faStarRegular;
  faStarSolid = faStarSolid;
  commentContent: string = '';
  commentId: string = '';
  postsComments: Comment[] = [];
  profileImgUrl: string = environment.profileImageUrl;
  profileImage: string = '';
  commentLimit = 1500;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCtrl : UserController,
    private postCtrl: PostController,
    private commentCtrl: CommentController,
    private genCtrl: GeneralController
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

          // Pre-process post tags
          for (let i = 0; i < this.post.keywords.length; i++) {
            (this.post.keywords[i] as any) = {
              display: this.post.keywords[i],
              value: this.post.keywords[i],
              readonly: true
            }
          }

          // Check if this is user's favourite post
          if (this.userCtrl.isUserLoggedIn()) {
            this.userCtrl.checkFavourite(this.postId).then(res => {
              this.isFavourite = res;
            });
          }
        })
        .catch(err => {
          this.router.navigate(['/notfound']);
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
      this.userCtrl.favouriteCount(this.postId)
        .then(res => {
          this.favCount = res;
        })
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

  isCommenter(id: string) {
    return id == this.userCtrl.getLoggedInUser();
  }

  goToEdit() {
    this.router.navigate(['/newpost'], { queryParams: { mode: 'edit', post: this.postId } });
    window.scroll(0, 0);
  }

  favouritePost() {
    this.userCtrl.addFavourite(this.postId)
      .then(user => {
        this.isFavourite = true;
        this.favCount += 1;
      });
  }

  deleteFavourite() {
    this.userCtrl.deleteFavourite(this.postId)
      .then(user => {
        this.isFavourite = false;
        this.favCount -= 1;
      });
  }

  createComment() {
    if (!this.commentContent) {
      this.genCtrl.showMessageToast('Please enter a comment');
      return;
    }
    this.commentCtrl.postComment(this.postId, this.commentContent)
      .then((comment: Comment) => {
        this.postsComments.unshift(comment);
        this.commentContent = '';
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  cancelComment() {
    this.commentContent = '';
  }

  removeComment(id: string) {
    this.commentCtrl.deleteComment(id)
      .then(() => {
        this.postsComments = this.postsComments.filter(comment => comment._id != id);
      })
  }

  getProfileImageUrl(user: User) {
    return environment.profileImageUrl + '/' + user.profile_image;
  }

  checkLoggedIn() {
    // Check if the user is logged in
    if (!this.userCtrl.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
  }
}
