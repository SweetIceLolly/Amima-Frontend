import { Component, OnInit, Input  } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "src/app/controllers/post.controller";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // @Input() posts: Post[] = [];
  // currentCategory: string = 'For You';

  constructor(
    private postCtrl: PostController,
    private router: Router
  ) {}

  ngOnInit(): void {

  }
  getCategory(currentCategory : string) {
    if (currentCategory) {
      this.router.navigate(['/'], { queryParams: { category : currentCategory } }); 
    }
    else {
      this.router.navigate(['/']);
    }
  }
}


