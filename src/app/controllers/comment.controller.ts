import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Comment } from "../models/Comment";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { UserController } from "./user.controller";

@Injectable()
export class CommentController {
  constructor(
    private http: HttpClient,
    private userCtrl: UserController
  ) {}

  getComment(postId: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Comment[]>(`${environment.apiUrl}/comments/${postId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))

        .subscribe((comments: Comment[]) => {
          resolve(comments);
        })
    });
  }

  postComment(postId: string, content: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
      this.http.post<Comment>(`${environment.apiUrl}/comment`, {
        postId: postId,
        content: content
      }, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: Comment) => {
          resolve(response);
        })
    });
  }

  deleteComment(commentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<any>(`${environment.apiUrl}/deletecomment/${commentId}`, this.userCtrl.getAuthHeader())
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
