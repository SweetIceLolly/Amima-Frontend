import { User } from "./User";
import { Comment } from "./Comment";

export class Post {
  _id: string;
  title: string;
  content: string;
  keywords: string[];
  images: string[];
  postDate: Date;
  posterId: User;
  category: String;

  constructor() {
    this.title = '';
    this.content = '';
    this.keywords = [];
    this.images = [];
    this.postDate = new Date();
    this.posterId = new User();
    this._id = '';
    this.category = '';
  }
}
