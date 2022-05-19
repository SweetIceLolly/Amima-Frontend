import { User } from "./User";

export class Post {
  title: string;
  content: string;
  keywords: string[];
  images: string[];
  postDate: Date;
  posterId: User;

  constructor() {
    this.title = '';
    this.content = '';
    this.keywords = [];
    this.images = [];
    this.postDate = new Date();
    this.posterId = new User();
  }
}
