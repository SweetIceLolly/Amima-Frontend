import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Comment } from "../models/Comment";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { UserController } from "./user.controller";

@Injectable()
export class PostController {
  constructor(
    private http: HttpClient,
    private userCtrl: UserController
  ) {}

  getComment(commentId: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Comment[]>(`${environment.apiUrl}/comments/${commentId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))

        .subscribe((comments: Comment[]) => {
          resolve(comments);
        })
    });
  }

  postComment(comment: Comment): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/comment`, comment, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }

  deleteComment(commentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<any>(`${environment.apiUrl}/deletecomment/${commentId}`, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((response: any) => {
          resolve(response);
        })
    });
  }
}
