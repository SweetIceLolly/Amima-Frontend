import { Component } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";
import { GeneralController } from "../../../controllers/general.controller";

@Component({
  selector: 'Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(
    private postCtrl: PostController,
    private genCtrl: GeneralController
  ) { }

  ngOnInit() {
    this.displayNewestPosts();
    this.genCtrl.subscribeSearchNotifier(this.displaySearchResults.bind(this));
  }

  displayNewestPosts() {
    this.postCtrl.getNewestPosts()
      .then((posts : Post[])=> {
        this.posts = posts;
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  displaySearchResults(posts: Post[] | undefined) {
    if (posts) {
      this.posts = posts;
    }
    else {
      this.displayNewestPosts();
    }
  }

  ngOnDestroy() {
    this.genCtrl.unsubscribeSearchNotifier(this.genCtrl.searchEventIndex);
  }
}
