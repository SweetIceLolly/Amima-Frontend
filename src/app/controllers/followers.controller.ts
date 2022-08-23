import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { UserController } from "./user.controller";

@Injectable()
export class FollowersController {
  constructor(
    private http: HttpClient,
    private userCtrl: UserController
  ) {}

  followUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/followuser`, {
        follow_to: userId
      }, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }

  unfollowUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/unfollowuser`, {
        unfollow_to: userId
      }, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }

  checkIsFollowedTo(to: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/isfollowed/${to}`, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response.followed);
        })
    });
  }

  changeSubscription(userId: string, newSub: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/changesub`, {
        follow_to: userId,
        subs: newSub
      }, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }

  getUserFollowerCount(userId: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/followerscount/${userId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response.count);
        })
    });
  }

  getFollowedUsers(userId: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/getfollowedusers`, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }

  getFollowers(userId: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/getfollowers`, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }
}
