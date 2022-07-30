import { Component, OnInit, Input  } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostController } from "src/app/controllers/post.controller";


@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() posts: Post[] = [];
  

  constructor(
    private postCtrl: PostController
  ) {}

  ngOnInit(): void {

  }
  category() {
    return 0;
  }
}


