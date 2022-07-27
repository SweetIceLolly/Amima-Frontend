import { Component, OnInit, Input  } from '@angular/core';
import { Post } from 'src/app/models/Post';


@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() posts: Post[] = [];
  

  constructor() {
    
   }

  ngOnInit(): void {

  }
  

}
