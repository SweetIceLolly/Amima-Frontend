import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/User";
import { CookieService } from 'ngx-cookie';
import { HttpHeaders } from '@angular/common/http';

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

  editProfile(userId: string, userInfo: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${environment.apiUrl}/edituser/${userId}`, {
        profileName: userInfo.user_name,
        profileImage: userInfo.profile_image,
        profileBio: userInfo.bio
      })
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((user: User) => {
          resolve(user);
        })
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
          this.storeToken(res.token);
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
          this.storeToken(res.token);
          resolve(res.token);
        })
    });
  }

  storeToken(token: string) {
    // Store the token in cookie
    this.cookieService.put('token', token);
  }

  getAuthHeader() {
    // Get the token from cookie
    return {
      headers: new HttpHeaders({
        'auth': `${this.cookieService.get('token')}`
      })
    };
  }

  isUserLoggedIn() {
    // Check if the user is logged in
    return this.cookieService.get('token') != null;
  }

  logout() {
    // Remove the token from server and cookie
    const token = this.cookieService.get('token');
    this.cookieService.remove('token');

    this.http.post<String>(`${environment.apiUrl}/logout`, {
      token: token
    });
  }

  updateUserInfo() {

  }
}
