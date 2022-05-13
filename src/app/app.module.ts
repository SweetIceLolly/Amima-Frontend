import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ControllersModule } from './controllers/controllers.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./modules/elements/header/Header.component";
import { FooterComponent } from "./modules/elements/footer/Footer.component";
import { HomeComponent } from "./modules/pages/home/Home.component";
import { NotFoundComponent } from "./modules/pages/404_page/NotFound.component";
import { AboutUsComponent } from "./modules/pages/about_us/AboutUs.component";
import { AuthorCardComponent } from "./modules/elements/author_card/AuthorCard.component";
import { CardComponent } from "./modules/elements/card/Card.component";
import { CardScreenComponent } from "./modules/elements/card_screen/CardScreen.component";
import { CreatePostComponent } from "./modules/pages/create_post/CreatePost.component";
import { ImageCarouselComponent } from "./modules/elements/image_carousel/ImageCarousel.component";
import { ImageUploaderComponent } from "./modules/elements/image_uploader/ImageUploader.component";
import { LoginComponent } from "./modules/pages/login/Login.component";
import { ProfilePageComponent } from "./modules/pages/profile_page/ProfilePage.component";
import { PostDetailsComponent } from "./modules/pages/post_details/PostDetails.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    AuthorCardComponent,
    CardComponent,
    CardScreenComponent,
    CreatePostComponent,
    ImageCarouselComponent,
    ImageUploaderComponent,
    LoginComponent,
    ProfilePageComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ControllersModule,
    FontAwesomeModule
  ],
  exports: [
    ControllersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
