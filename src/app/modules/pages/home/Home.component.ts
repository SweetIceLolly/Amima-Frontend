import { Component, HostListener } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "../../../controllers/post.controller";
import { GeneralController } from "../../../controllers/general.controller";
import { delay, tap } from 'rxjs';

@Component({
  selector: 'Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  posts: Post[] = [];
  lastLoadTime: Date = new Date();
  isLoading = false;

  @HostListener("window:scroll", ["$event"])
  getScrollHeight(): void {
    this.isLoading = true;
    console.log('HIT');
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 300) {
      console.log("bottom of the page");
      this.postCtrl.getNewestPosts(this.posts.length)
        .then((posts : Post[])=> {
          for (let post of posts) {
            this.posts.push(post);
          }
          this.isLoading = false;
        })
        .catch((err: any) => {
          console.log(err);
        })
    }
    else {
      this.isLoading = false;
    }
  }

  constructor(
    private postCtrl: PostController,
    private genCtrl: GeneralController
  ) { }

  ngOnInit() {
    this.postCtrl.getNewestPosts(0)
        .then((posts : Post[])=> {
          this.posts = posts;
        })
        .catch((err: any) => {
          console.log(err);
        })
    
    this.genCtrl.subscribeSearchNotifier(this.displaySearchResults.bind(this));
  }

  displaySearchResults(posts: Post[] | undefined) {
    if (posts) {
      this.posts = posts;
    }
    else {
      this.postCtrl.getNewestPosts(this.posts.length)
        .then((posts : Post[])=> {
          this.posts = posts;
        })
        .catch((err: any) => {
          console.log(err);
        })
    }
  }

  ngOnDestroy() {
    this.genCtrl.unsubscribeSearchNotifier(this.genCtrl.searchEventIndex);
  }
}
