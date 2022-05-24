import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/User";

@Injectable()
export class UserController {
  constructor(
    private http: HttpClient
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

  googleLogin() {

  }

  facebookLogin() {

  }

  storeToken() {

  }

  updateUserInfo() {

  }
}
