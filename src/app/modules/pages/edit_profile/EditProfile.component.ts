import { Component } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserController } from "../../../controllers/user.controller";
import { User } from "src/app/models/User";

@Component({
  selector: 'EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css']
})
export class EditProfileComponent {
  currentUser: User = new User();
  faQuestionCircle = faQuestionCircle;
  faCamera = faCamera;

  constructor(
    private userCtrl: UserController
  ) {}

  editProfile() {
    this.userCtrl.editProfile(this.currentUser);
  }

  ngOnInit() {
    this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
      .then((user: User) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {

  }
}