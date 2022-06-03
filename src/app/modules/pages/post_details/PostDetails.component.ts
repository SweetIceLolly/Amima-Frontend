import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostController } from 'src/app/controllers/post.controller';
import { UserController } from 'src/app/controllers/user.controller';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment';

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
        this.user = post.posterId;

        // Pre-process post image paths
        for (let i = 0; i < this.post.images.length; i++) {
          this.post.images[i] = environment.postImageUrl + '/' + this.post.images[i];
        }
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  deletePost() {
    this.postCtrl.deletePost(this.post._id)
      .then(() => {  
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkIsUser() {
    return this.userCtrl.isUserLoggedIn()
  }

  goToEdit() {
    this.router.navigate(['/newpost'], { queryParams: { mode: 'edit', post: this.id } });
  }
}


