import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { faPenToSquare, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'ProfilePage',
  templateUrl: './ProfilePage.component.html',
  styleUrls: ['./ProfilePage.component.css']
})
export class ProfilePageComponent {
  id: string = '';
  faPenToSquare = faPenToSquare;
  faArrowAltCircleRight = faArrowAltCircleRight;
  user: User = new User();
  posts: Post[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private userCtrl : UserController,
    private postCtrl: PostController,
    private router: Router
  ) {

  }
  checkLoggedIn(){
    return this.id == this.userCtrl.getLoggedInUser();
  }
  
  deleteLoginCookie(){
    this.userCtrl.logout();
  }
  
  goHome() {
    this.router.navigate(['/']);
  }

  goEditProfile() {
    this.router.navigate(['/edit_profile/' + this.userCtrl.getLoggedInUser()]);
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      this.userCtrl.getUserInfo(this.id)
        .then((user: User) => {
          this.user = user;
        })
        .catch(err => {
          console.log(err);
        });

      this.postCtrl.getPostByUser(this.id)
        .then((posts: Post[]) => {
          this.posts = posts;
        })
        .catch(err => {
          console.log(err);
        });
        
      });
    }

  ngOnDestroy() {

  }
}

