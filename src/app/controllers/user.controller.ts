import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/User";
import { CookieService } from 'ngx-cookie';
import { HttpHeaders } from '@angular/common/http';
import { Post } from "../models/Post";

@Injectable()
export class UserController {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getUserInfo(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get<User>(`${environment.apiUrl}/user/${userId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
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
        profileImg: userInfo.profile_image,
        bio: userInfo.bio
      }, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
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
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.storeToken(res.token, res.user_id);
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
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((res: any) => {
          this.storeToken(res.token, res.user_id);
          resolve(res.token);
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

    this.http.post<String>(`${environment.apiUrl}/logout`, {
      token: token,
      user_id: user_id
    });
  }

  addFavourite(post: Post): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.post<Post>(`${environment.apiUrl}/post`, post, this.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((post: Post) => {
          resolve(post);
        })
    });
  }
}
