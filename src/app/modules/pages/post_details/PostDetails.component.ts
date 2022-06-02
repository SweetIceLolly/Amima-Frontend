import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'PostDetails',
  templateUrl: './PostDetails.component.html',
  styleUrls: ['./PostDetails.component.css']
})
export class PostDetailsComponent {
  id: string = '';
  user: User = new User();
  post: Post = new Post();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCtrl : UserController,
    private postCtrl: PostController
  ) { }

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

  goToEdit() {
    this.router.navigate(['/newpost'], { queryParams: { mode: 'edit', post: this.id } });
  }
}
