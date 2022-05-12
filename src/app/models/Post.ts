export class Post {
  title: string;
  content: string;
  keywords: string[];
  images: string[];
  postDate: Date;
  posterId: any;

  constructor() {
    this.title = '';
    this.content = '';
    this.keywords = [];
    this.images = [];
    this.postDate = new Date();
    this.posterId = '';
  }
}
