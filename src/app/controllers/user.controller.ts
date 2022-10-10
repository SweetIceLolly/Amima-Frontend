import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/User";
import { CookieService } from 'ngx-cookie';
import { HttpHeaders } from '@angular/common/http';
import { Post } from "../models/Post";
import { GeneralController } from "./general.controller";

@Injectable()
export class UserController {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private genCtrl: GeneralController
  ) {}

  getUserInfo(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get<User>(`${environment.apiUrl}/user/${userId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((user: User) => {
          resolve(user);
        })
    });
  }

  editProfile(userInfo: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}/editProfile`, {
        userName: userInfo.user_name,
        bio: userInfo.bio
      }, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((user: User) => {
          resolve(user);
        })
    });
  }

  uploadProfileImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("image", file);

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/profileimage`, formData, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => {
            new Error(err.message)
          });
        }))

        .subscribe(data => {
          resolve(data);
        });
    });
  }

  googleLoginCallback(loginData: any): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post<String>(`${environment.apiUrl}/login`, {
        provider: 'google',
        loginData: loginData.credential
      })
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.storeToken(res.token, res.user_id);
          this.genCtrl.triggerLoginSubscription(res.user_id, res.token);
          resolve(res.token);
        })
    });
  }

  appleLoginCallback(loginData: any): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post<String>(`${environment.apiUrl}/login`, {
        provider: 'apple',
        loginData: loginData,
        useBundleId: "false",
        isWeb: "true"
      })
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.storeToken(res.token, res.user_id);
          this.genCtrl.triggerLoginSubscription(res.user_id, res.token);
          resolve(res.token);
        })
    });
  }

  facebookLoginCallback(loginData: any): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post<String>(`${environment.apiUrl}/login`, {
        provider: 'facebook',
        loginData: loginData
      })
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.storeToken(res.token, res.user_id);
          this.genCtrl.triggerLoginSubscription(res.user_id, res.token);
          resolve(res.token);
        })
    });
  }

  addFavourite(post_id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}/favourite`, {post_id: post_id}, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((user: User) => {
          resolve(user);
        })
    });
  }

  checkFavourite(postId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/checkFavourite/${postId}`, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          resolve(res.check);
        })
    });
  }

  deleteFavourite(postId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.delete<User>(`${environment.apiUrl}/favourite/${postId}`, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((user: User) => {
          resolve(user);
        })
    });
  }

  getfavPostByUser(userId: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Post[]>(`${environment.apiUrl}/favourite/${userId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))

        .subscribe((favPosts: Post[]) => {
          resolve(favPosts);
        })
    });
  }

  favouriteCount(post_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get<number>(`${environment.apiUrl}/favouriteCount/${post_id}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((count: any) => {
          resolve(count.count);
        })
    });
  }

  deleteAccount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<any>(`${environment.apiUrl}/deleteAccount`, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.cookieService.remove('token');
          this.cookieService.remove('user_id');
          resolve(res);
        })
    });
  }

  storeToken(token: string, user_id: string) {
    // Store the token and the user ID in cookie
    this.cookieService.put('token', token);
    this.cookieService.put('user_id', user_id);
  }

  getAuthHeader() {
    // Get the token from cookie
    return {
      headers: new HttpHeaders({
        'auth': `${this.cookieService.get('token')}`
      })
    };
  }

  getLoggedInUser() {
    return this.cookieService.get('user_id');
  }

  isUserLoggedIn() {
    // Check if the user is logged in
    return this.cookieService.get('token') != null;
  }

  logout() {
    // Remove the token from server and cookie
    const token = this.cookieService.get('token');
    const user_id = this.cookieService.get('userID');
    this.cookieService.remove('token');
    this.cookieService.remove('user_id');

    this.genCtrl.triggerLogoutSubscription();

    this.http.post<String>(`${environment.apiUrl}/logout`, {
      token: token,
      user_id: user_id
    });
  }

  logoutIfTokenInvalid(err: HttpErrorResponse) {
    const reasons = [
      'Failed to verify token',
      'No email associated',
      'Invalid token',
      'Invalid provider',
      'User not found'
    ];
    if (reasons.includes(err.error.error)) {
      this.cookieService.remove('token');
      this.cookieService.remove('user_id');
      this.genCtrl.triggerLogoutSubscription();
    }
  }
}
