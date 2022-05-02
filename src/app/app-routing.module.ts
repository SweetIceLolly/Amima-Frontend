import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./modules/pages/home/Home.component";
import { NotFoundComponent } from './modules/pages/404_page/NotFound.component';
import { LoginComponent } from './modules/pages/login/Login.component';
import { AboutUsComponent } from "./modules/pages/about_us/AboutUs.component";
import { CreatePostComponent } from './modules/pages/create_post/CreatePost.component';
import { PostDetailsComponent } from "./modules/pages/post_details/PostDetails.component";
import { ProfilePageComponent } from "./modules/pages/profile_page/ProfilePage.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'newpost',
    component: CreatePostComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
  },
  {
    path: '**',
    redirectTo: 'notfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
