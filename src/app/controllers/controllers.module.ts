import { NgModule } from '@angular/core';

import { PostController } from './post.controller';
import { UserController } from './user.controller';
import { CommentController } from './comment.controller';
import { GeneralController } from './general.controller';
import { FollowersController } from './followers.controller';

@NgModule({
  providers: [
    PostController,
    UserController,
    CommentController,
    GeneralController,
    FollowersController
  ],
})

export class ControllersModule { }

export {
  PostController,
  UserController,
  CommentController,
  GeneralController,
  FollowersController
}
