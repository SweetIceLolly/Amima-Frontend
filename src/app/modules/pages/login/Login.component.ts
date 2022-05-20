import { Component } from '@angular/core';
import { UserController } from '../../../controllers/user.controller';
import { environment } from "src/environments/environment";

@Component({
  selector: 'Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {
  constructor(
    private userCtrl: UserController
  ) { }

  ngAfterViewInit() {
    // Initialize the Google login
    (window as any).google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleGoogleLogin
    });

    // Initialize the Facebook login
    const fbJsUrl = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=${environment.facebookAppId}&autoLogAppEvents=1`;
    document.body.append(`
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="${fbJsUrl}" nonce="lI4daaDa"></script>
    `);

    // Render the Google login button
    (window as any).google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "filled_blue", size: "large" }
    );
  }

  handleGoogleLogin(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  facebookLogin() {
    this.userCtrl.facebookLogin();
  }
}
