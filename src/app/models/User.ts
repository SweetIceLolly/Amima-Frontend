export class User {
  first_name: String;
  last_name: String;
  email: String;
  profile_image: String;
  provider: String;
  bio: String;
  created_at: Date;
  posts: any[];
  favourites: any[];

  constructor() {
    this.first_name= '';
    this.last_name= '';
    this.email= '';
    this.profile_image= '';
    this.provider= '';
    this.bio= '';
    this.created_at= new Date() ;
    this.posts= [];
    this.favourites= [];

  }
}
