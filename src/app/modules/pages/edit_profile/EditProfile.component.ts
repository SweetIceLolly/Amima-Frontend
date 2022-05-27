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
  newName: string = "";
  newEmail: string = "";
  newBio: string = "";
  faQuestionCircle = faQuestionCircle;
  faCamera = faCamera;

  constructor(
    private userCtrl: UserController
  ) {}

  editProfile() {
    let currentUserID = this.userCtrl.getLoggedInUser();
    //let currentUser: User = this.userCtrl.getUserInfo(currentUserID);
    let currentUser = new User();
    currentUser.user_name = this.newName;
    currentUser.email = this.newEmail;
    currentUser.bio = this.newBio;
    //currentUser.profile_image = TODO;
    
    this.userCtrl.editProfile(currentUser);
  }


  ngOnInit() {
  }

  ngOnDestroy() {

  }
}