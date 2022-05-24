import { Component } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css']
})
export class EditProfileComponent {

  faQuestionCircle = faQuestionCircle;
  faCamera = faCamera;
  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}