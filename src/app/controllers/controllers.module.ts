import { NgModule } from '@angular/core';

import { PostController } from './post.controller';
import { UserController } from './user.controller';
import { CommentController } from './comment.controller';
import { GeneralController } from './general.controller';

@NgModule({
  providers: [
    PostController,
    UserController,
    CommentController,
    GeneralController
  ],
})

export class ControllersModule { }

export {
  PostController,
  UserController,
  CommentController,
  GeneralController
}
