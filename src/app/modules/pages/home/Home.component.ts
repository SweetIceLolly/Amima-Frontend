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
  currentPostIds: Set<string> = new Set();
  lastLoadTime: Date = new Date();
  page: number = 0;

  constructor(
    private postCtrl: PostController,
    private genCtrl: GeneralController
  ) { }

  ngOnInit() {
    this.postCtrl.getNewestPosts(0)
        .then((posts : Post[])=> {
          posts.forEach((post : Post) => {
            this.currentPostIds.add(post._id);
          });
          this.posts = posts;
        })
        .catch((err: any) => {
          console.log(err);
        })

    this.genCtrl.subscribeSearchNotifier(this.displaySearchResults.bind(this));
  }

  @HostListener("window:scroll", ["$event"])
  getScrollHeight(): void {
    if (this.lastLoadTime.getTime() + 1000 < new Date().getTime()) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 300) {
        this.lastLoadTime = new Date();
        this.page = Math.floor(this.posts.length / 20);
        this.postCtrl.getNewestPosts(20 * this.page)
          .then((posts : Post[])=> {
            for (let post of posts) {
              if (!this.currentPostIds.has(post._id)) {
                this.posts.push(post);
                this.currentPostIds.add(post._id);
              }
            }
            window.scrollTo(window.scrollX, window.scrollY - 10);
          })
          .catch((err: any) => {
            console.log(err);
          });
        this.lastLoadTime = new Date();
      }
    }
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
