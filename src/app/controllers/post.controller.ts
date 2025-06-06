import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Post } from "../models/Post";
import { catchError, delay, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { UserController } from "./user.controller";

@Injectable()
export class PostController {
  constructor(
    private http: HttpClient,
    private userCtrl: UserController
  ) {}

  getPostInfo(postId: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.get<Post>(`${environment.apiUrl}/post/${postId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))

        .subscribe((post: Post) => {
          resolve(post);
        })
    });
  }

  getPostByUser(userId: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Post[]>(`${environment.apiUrl}/postbyuser/${userId}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))

        .subscribe((posts: Post[]) => {
          resolve(posts);
        })
    });
  }

  createPost(post: Post): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.post<Post>(`${environment.apiUrl}/post`, post, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((post: Post) => {
          resolve(post);
        })
    });
  }

  editPost(post: Post): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.post<Post>(`${environment.apiUrl}/editPost`, post, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((post: Post) => {
          resolve(post);
        })
    });
  }

  searchPosts(keyword: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Post[]>(`${environment.apiUrl}/searchPost?searchterm=${keyword}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((posts: Post[]) => {
          resolve(posts);
        })
    });
  }

  deletePost(postId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete<Post>(`${environment.apiUrl}/deletepost/${postId}`, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe(() => {
          resolve();
        })
    });
  }

  getNewestPosts(skipCount: number): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Post[]>(`${environment.apiUrl}/newestposts?count=${skipCount}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((posts: Post[]) => {
          resolve(posts);
        })
    });
  }

  getNewestPostsCategory(skipCount: number, category: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Post[]>(`${environment.apiUrl}/filterposts?count=${skipCount}&filter=${category}`)
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
          reject(err.error);
          return throwError(() => { new Error(err.message) });
        }))
        .subscribe((posts: Post[]) => {
          resolve(posts);
        })
    });

  }

  uploadPostImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("image", file);

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/postimage`, formData, this.userCtrl.getAuthHeader())
        .pipe(catchError((err: HttpErrorResponse) => {
          this.userCtrl.logoutIfTokenInvalid(err);
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
