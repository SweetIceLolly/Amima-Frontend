import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { PostController } from 'src/app/controllers/post.controller';
import { GeneralController } from 'src/app/controllers/general.controller';
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'ngx-cookie';
import { User } from 'src/app/models/User';
import { environment } from "src/environments/environment";
import { faBell, faSmileWink, faXmarkCircle, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent {
  faBell = faBell;
  faSmileWink = faSmileWink;
  faXmarkCircle = faXmarkCircle;
  faTrashCan = faTrashCan;

  loggedIn: boolean = false;
  searchContent: string = "";
  profileImage: string = '';
  gettingProfileImage: boolean = false;
  loggedInUserToken: string = '';

  wsFollowing: WebSocket | undefined;
  showNotificationPanel: boolean = false;
  notifications: any[] = [];

  constructor(
    private userCtrl: UserController,
    private postCtrl: PostController,
    private genCtrl: GeneralController,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.loggedIn = this.userCtrl.isUserLoggedIn();
      if (this.loggedIn) {
        this.getProfileImageUrl();
      }
    }, 100);

    this.genCtrl.subscribeLoginCallback(this.connectFollowerWsServer.bind(this));
    this.genCtrl.subscribeLogoutCallback(this.disconnectFollowerWsServer.bind(this));

    if (this.userCtrl.isUserLoggedIn()) {
      this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
        .then((user: User) => {
          this.loggedIn = true;
          this.connectFollowerWsServer(this.cookieService.get('user_id') as string, this.cookieService.get('token') as string);
        })
        .catch(err => {
          this.userCtrl.logout();
        });
    }
  }

  getProfileImageUrl() {
    if (!this.profileImage && this.userCtrl.isUserLoggedIn()) {

      if (!this.gettingProfileImage) {
        this.gettingProfileImage = true;
        this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
          .then((user: User) => {
            this.profileImage = environment.profileImageUrl + '/' + user.profile_image;
          })
          .catch(err => {
            this.userCtrl.logout();
          })
          .finally(() => {
            this.gettingProfileImage = false;
          });
      }
    }
  }

  goHome() {
    // Clear the search results
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
    if (this.searchContent) {
      this.router.navigate(['/'], { queryParams: { search: this.searchContent } });
    }
    else {
      this.router.navigate(['/']);
    }
  }

  ToggleNotifications() {
    this.showNotificationPanel = !this.showNotificationPanel;
  }

  connectFollowerWsServer(user_id: string, token: string) {
    this.loggedInUserToken = token;
    this.wsFollowing = new WebSocket(environment.followingWsUrl);
    this.wsFollowing.onopen = this.wsOnOpen.bind(this, this.wsFollowing);
    this.wsFollowing.onmessage = this.wsOnMessage.bind(this, this.wsFollowing);
  }

  disconnectFollowerWsServer() {
    (this.wsFollowing as WebSocket).close();
  }

  wsOnOpen(websocket: WebSocket, event: Event) {
    websocket.send(JSON.stringify({
      type: 'auth',
      token: this.loggedInUserToken
    }));
  }

  wsOnMessage(websocket: WebSocket, event: MessageEvent) {
    let data = JSON.parse(event.data);
    if (data.type !== 'auth_success') {
      this.notifications.push(data);
    }
  }

  generateNotificationContent(notification: any) {
    switch (notification.type) {
      case 'post':
        return notification.data.user_name + ' has created a new post: ' + notification.data.post_title;

      case 'comment':
        return notification.data.user_name + ' has commented on the post: ' + notification.data.post_title;

      case 'favourite':
        return notification.data.user_name + ' has favourited a post: ' + notification.data.post_title;

      case 'follow_to':
        return notification.data.from_name + ' has started following ' + notification.data.to_name;

      case 'followed_by':
        return notification.data.from_name + ' has started following you!';

      default:
        return '';
    }
  }
}
