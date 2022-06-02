import { Component } from '@angular/core';
import { UserController } from 'src/app/controllers/user.controller';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/models/User';


@Component({
  selector: 'Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent {

  loggedIn: boolean = false;
  id: string = '';
  user: User = new User();

  constructor(
    private UserCtrl: UserController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.loggedIn = this.UserCtrl.isUserLoggedIn();
    }, 100);

    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      this.UserCtrl.getUserInfo(this.id)
        .then((user: User) => {
          this.user = user;
        })
        .catch(err => {
          console.log(err);
        });

      });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {

  }
}
