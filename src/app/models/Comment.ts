import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  _id: string;
  content: string;
  postId: string;
  userId: string;
  postDate: Date;
  

  constructor() {
    this.content = '';
    this.postId = '';
    this.userId = '';
    this.postDate = new Date();
    this._id = '';
  }
}