import { Component, EventEmitter, Input, Output} from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserController } from "../../../controllers/user.controller";
import { User } from "src/app/models/User";
import { Router } from '@angular/router';

@Component({
  selector: 'EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css']
})
export class EditProfileComponent {
  currentUser: User = new User();
  faQuestionCircle = faQuestionCircle;
  faCamera = faCamera;
  file: any;
  constructor(
    private userCtrl: UserController,
    private router: Router
    
  ) {}

  editProfile() {
    this.userCtrl.editProfile(this.currentUser);
    this.router.navigate(['/profile/' + this.currentUser]);
    window.scroll(0, 0);
  }

  uploadImage(event: any) {
    this.userCtrl.uploadProfileImage(event.target.files[0]);
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