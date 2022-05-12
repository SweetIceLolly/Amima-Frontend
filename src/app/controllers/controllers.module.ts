import { NgModule } from '@angular/core';

import { PostController } from './post.controller';
import { UserController } from './user.controller';

@NgModule({
  providers: [
    PostController,
    UserController
  ],
})

export class ControllersModule { }

export {
  PostController,
  UserController
}
