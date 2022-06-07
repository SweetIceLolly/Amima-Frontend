import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { PostController } from 'src/app/controllers/post.controller';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { environment } from "src/environments/environment";

@Component({
  selector: 'Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent {
  loggedIn: boolean = false;
  profileImageUrl: string = '';
  searchContent: string = "";

  constructor(
    private userCtrl: UserController,
    private postCtrl: PostController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.loggedIn = this.userCtrl.isUserLoggedIn();
    }, 100);

    if (this.userCtrl.isUserLoggedIn()) {
      this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
        .then((user: User) => {
          this.profileImageUrl = environment.profileImageUrl + '/' + user.profile_image;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  goHome() {
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
    if (this.searchContent == "" || this.searchContent.length < 1){
      alert('Search content is empty');
    }
    else{
      this.postCtrl.searchPosts(this.searchContent)
        .then(() => {
          alert('OK!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
