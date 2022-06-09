import { Component, EventEmitter, Input, Output} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserController } from "../../../controllers/user.controller";
import { User } from "src/app/models/User";
import { Router } from '@angular/router';
import { environment } from "src/environments/environment"

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
  imgUrl: any = undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private userCtrl: UserController,
    private router: Router

  ) {}

  editProfile() {
    this.userCtrl.editProfile(this.currentUser);
    this.router.navigate(['/profile/' + this.currentUser._id]);
    window.scroll(0, 0);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.userCtrl.uploadProfileImage(file).then(res => {
      this.imgUrl = `${environment.profileImageUrl}/${res.imageId}.png`;
    });
  }

  ngOnInit() {
    this.userCtrl.getUserInfo((this.userCtrl.getLoggedInUser() as string))
      .then((user: User) => {
        this.currentUser = user;
        this.imgUrl = `${environment.profileImageUrl}/${this.currentUser.profile_image}.png`;
      });
  }

  ngOnDestroy() {

  }
}
