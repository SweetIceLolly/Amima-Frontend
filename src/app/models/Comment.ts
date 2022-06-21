import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  _id: string;
  content: string;
  postId: string;
  userId: User;
  created_at: Date;
  

  constructor() {
    this.content = '';
    this.postId = '';
    this.userId = new User();
    this.created_at = new Date();
    this._id = '';
  }
}