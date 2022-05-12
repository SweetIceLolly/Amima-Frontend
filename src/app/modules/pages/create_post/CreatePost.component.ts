import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})


export class CreatePostComponent {

  inputText = "";
  txtLimit = 2000;

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
