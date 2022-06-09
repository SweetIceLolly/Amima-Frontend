import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { PostController } from 'src/app/controllers/post.controller';
import { GeneralController } from 'src/app/controllers/general.controller';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { environment } from "src/environments/environment";
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent {
  loggedIn: boolean = false;
  searchContent: string = "";
  profileImage: string = '';

  constructor(
    private userCtrl: UserController,
    private postCtrl: PostController,
    private genCtrl: GeneralController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.loggedIn = this.userCtrl.isUserLoggedIn();
      this.getProfileImageUrl();
    }, 100);

    if (this.userCtrl.isUserLoggedIn()) {
      this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
        .then((user: User) => {
          this.loggedIn = true;
        })
        .catch(err => {
          this.userCtrl.logout();
        });
    }
  }

  getProfileImageUrl() {
    if (!this.profileImage && this.userCtrl.isUserLoggedIn()) {
      this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
        .then((user: User) => {
          this.profileImage = environment.profileImageUrl + '/' + user.profile_image;
        })
        .catch(err => {
          this.userCtrl.logout();
        });
    }
  }

  goHome() {
    // Clear the search results
    this.genCtrl.notifySearchNotifier(undefined);
    this.searchContent = "";

    this.router.navigate(['/']);
    window.scroll(0, 0);
  }

  goAbout() {
    this.router.navigate(['about']);
    window.scroll(0, 0);
  }

  goNewPost() {
    // Check if the user is logged in
    if (this.userCtrl.isUserLoggedIn()) {
      this.router.navigate(['newpost']);
    }
    else {
      this.router.navigate(['login']);
    }
    window.scroll(0, 0);
  }

  goProfile() {
    this.router.navigate(['profile/' + this.userCtrl.getLoggedInUser()]);
    window.scroll(0, 0);
  }

  goLogin() {
    this.router.navigate(['login']);
    window.scroll(0, 0);
  }

  searchFunc() {
    if (this.searchContent.length < 1){
      this.genCtrl.notifySearchNotifier(undefined);
    }
    else{
      this.postCtrl.searchPosts(this.searchContent)
        .then((posts: Post[]) => {
          this.genCtrl.notifySearchNotifier(posts);
          this.router.navigate(['/']);
          window.scroll(0, 0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
