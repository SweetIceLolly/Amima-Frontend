import { Component } from '@angular/core';
import { UserController } from '../../../controllers/user.controller';
import { environment } from "src/environments/environment";
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {
  faFacebook = faFacebook;
  faUsers = faUsers;

  constructor(
    private userCtrl: UserController,
    private router: Router
  ) { }

  ngAfterViewInit() {
    // Store the class in the global scope
    (window as any).LoginComponent = this;

    // Initialize the Google login
    const script_google = document.createElement('script');
    script_google.src = 'https://accounts.google.com/gsi/client';
    script_google.type = 'text/javascript';
    script_google.onload = () => {
      (window as any).google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (window as any).LoginComponent.handleGoogleLogin
      });

      // Render the Google login button
      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: 'filled_blue', size: 'medium', width: '216' }
      );
    };
    document.getElementsByTagName( "head" )[0].appendChild(script_google);

    // Initialize the Facebook login
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v13.0'
      });
    };

    // Initialize the Apple login
    const script_apple = document.createElement('script');
    script_apple.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    script_apple.type = 'text/javascript';
    script_apple.onload = () => {
      (window as any).AppleID.auth.init({
        clientId : environment.appleServiceId,
        scope : 'name email',
        redirectURI : environment.appleRedirectUrl,
        usePopup : true
    });
    (window as any).document.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
      (window as any).LoginComponent.userCtrl.appleLoginCallback(event.detail.authorization.code)
        .then((token: String) => {
          (window as any).LoginComponent.router.navigate(['/']);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    };
    document.getElementsByTagName( "head" )[0].appendChild(script_apple);
  }

  handleGoogleLogin(loginRes: any) {
    (window as any).LoginComponent.userCtrl.googleLoginCallback(loginRes)
      .then((token: String) => {
        (window as any).LoginComponent.router.navigate(['/']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  facebookLogin() {
    (window as any).FB.login((loginRes: any) => {
      if (loginRes.status === 'connected') {
        this.handleFacebookLogin(loginRes.authResponse);
      }
    }, {
      scope: 'email',
      return_scopes: true
    });
  }

  handleFacebookLogin(loginRes: any) {
    this.userCtrl.facebookLoginCallback(loginRes)
      .then((token: String) => {
        this.router.navigate(['/']);
        window.scroll(0, 0);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
