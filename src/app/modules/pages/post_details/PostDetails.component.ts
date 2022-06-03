import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { faPenToSquare, faTrashCan, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'PostDetails',
  templateUrl: './PostDetails.component.html',
  styleUrls: ['./PostDetails.component.css']
})
export class PostDetailsComponent {
  id: string = '';
  user: User = new User();
  post: Post = new Post();
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faStarRegular = faStarRegular;
  faStarSolid = faStarSolid;


  constructor(
    private route: ActivatedRoute,
    private userCtrl : UserController,
    private postCtrl: PostController
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];

      this.postCtrl.getPostInfo(this.id)
      .then((post: Post) => {
        this.post = post;

        this.userCtrl.getUserInfo(this.post.posterId._id)
          .then((user: User) => {
            this.user = user;
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    });

  }

  deletePost(){
  this.postCtrl.deletePost(this.post._id)
  .then(() => {  
  })
  .catch(err => {
    console.log(err);
  });
    }
    ngOnDestroy() {

    }
  checkIsUser() {
      return this.userCtrl.isUserLoggedIn()
  }
}


