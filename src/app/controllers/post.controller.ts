import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Post } from "../models/Post";
import { catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class PostController {
  constructor(
    private http: HttpClient
  ) {}

  getPostInfo(postId: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.get<Post>(`${environment.apiUrl}/post/${postId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((post: Post) => {
          resolve(post);
        })
    });
  }

  createPost(post: any) {

  }

  searchPosts(keyword: string) {

  }

  getNewestPosts() {

  }

  uploadPostImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("image", file);

    const httpParams = new HttpParams()
      .append('token', '123456');   // todo: read token from cookie

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/post/image`, formData, {params: httpParams})
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
}
