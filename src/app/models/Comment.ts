import { User } from "./User";
import { Post } from "./Post";

export class Comment {
  _id: string;
  content: string;
  postId: Post;
  userId: User;
  postDate: Date;
  

  constructor() {
    this.content = '';
    this.postId = new Post();
    this.userId = new User();
    this.postDate = new Date();
    this._id = '';
  }
}