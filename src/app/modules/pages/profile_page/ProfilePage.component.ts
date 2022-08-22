import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { faPenToSquare, faArrowAltCircleRight, faBell, faXmarkCircle, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { FollowersController } from 'src/app/controllers/followers.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { environment } from "src/environments/environment";

@Component({
  selector: 'ProfilePage',
  templateUrl: './ProfilePage.component.html',
  styleUrls: ['./ProfilePage.component.css']
})
export class ProfilePageComponent {
  faPenToSquare = faPenToSquare;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faBell = faBell;
  faBellSlash = faBellSlash;
  faXmarkCircle = faXmarkCircle;

  user: User = new User();
  posts: Post[] = [];
  favPosts: Post[] = [];
  profileImageUrl: string = environment.profileImageUrl;
  showFav: boolean = false;
  showSubPanel: boolean = false;

  following: any[] = [];
  followers: any[] = [];
  followedToCurrentUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userCtrl : UserController,
    private postCtrl: PostController,
    private followerCtrl: FollowersController,
    private router: Router
  ) { }

  checkIsUser(){
    return this.user._id == this.userCtrl.getLoggedInUser();
  }

  isLoggedIn() {
    return this.userCtrl.isUserLoggedIn();
  }

  deleteLoginCookie() {
    this.userCtrl.logout();
  }

  goHome() {
    this.router.navigate(['/']);
    window.scroll(0, 0);
  }

  goEditProfile() {
    this.router.navigate(['/edit_profile/' + this.userCtrl.getLoggedInUser()]);
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const userId = params['id'];

      // Get user info
      this.userCtrl.getUserInfo(userId)
        .then((user: User) => {
          this.user = user;

          // Get user's posts
          this.postCtrl.getPostByUser(userId)
            .then((posts: Post[]) => {
              this.posts = posts;
            })
            .catch(err => {
              console.log(err);
            });

          // Get user's favorite posts
          this.userCtrl.getfavPostByUser(userId)
            .then((favPosts: Post[]) => {
              this.favPosts = favPosts.filter(post => post !== null);
            })
            .catch(err => {
              console.log(err);
            });

          if (this.checkIsUser()) {
            // Get user's followers
            this.followerCtrl.getFollowers(userId)
              .then((followers: any) => {
                this.followers = followers;
              })
              .catch(err => {
                console.log(err);
              });

            // Get user's subscriptions
            this.followerCtrl.getFollowedUsers(userId)
              .then((following: any) => {
                this.following = following;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // Check if the user is following to the current user
            this.followerCtrl.checkIsFollowedTo(userId)
              .then((following: boolean) => {
                this.followedToCurrentUser = following;
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          this.router.navigate(['/notfound']);
        });
    });
  }

  switchShowFav(showFav: boolean) {
    this.showFav = showFav;
  }

  followCurrentUser() {
    this.followerCtrl.followUser(this.user._id)
      .then(() => {
        this.followedToCurrentUser = true;
      });
  }

  unfollowCurrentUser() {
    this.followerCtrl.unfollowUser(this.user._id)
      .then(() => {
        this.followedToCurrentUser = false;
      });
  }
}

