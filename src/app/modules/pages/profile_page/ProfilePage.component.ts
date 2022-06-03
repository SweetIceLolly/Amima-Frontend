import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { faPenToSquare, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
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
  user: User = new User();
  posts: Post[] = [];
  favPosts: Post[] = [];
  profileImageUrl: string = environment.profileImageUrl;
  showFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userCtrl : UserController,
    private postCtrl: PostController,
    private router: Router
  ) {

  }
  checkIsUser(){
    return this.user._id == this.userCtrl.getLoggedInUser();
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
      this.userCtrl.getUserInfo(params['id'])
        .then((user: User) => {
          this.user = user;
          this.posts = user.posts;
          this.favPosts = user.favourites;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  switchShowFav(showFav: boolean) {
    this.showFav = showFav;
  }
}

