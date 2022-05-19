import { NgModule } from '@angular/core';

import { PostController } from './post.controller';
import { UserController } from './user.controller';
import { GeneralController } from './general.controller';

@NgModule({
  providers: [
    PostController,
    UserController,
    GeneralController
  ],
})

export class ControllersModule { }

export {
  PostController,
  UserController,
  GeneralController
}
