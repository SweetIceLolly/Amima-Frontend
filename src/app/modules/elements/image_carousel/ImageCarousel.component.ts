import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ImageCarousel',
  templateUrl: './ImageCarousel.component.html',
  styleUrls: ['./ImageCarousel.component.css']
})

export class ImageCarouselComponent {

  public slides: string [] = ['assets/product1.jpg', 'assets/product2.jpg', 'assets/product3.jpg', 'assets/amimaLogo.jpeg' ]
  i!: number;
  
  showSlide(slides: { [x: string]: any; }, i: string | number) {
    console.log(i);
    let slide = slides[i];
    return slide;
  }
  
  getPrev(slides: any, i: any) {
    this.i = this.i - 1;
    if (this.i < 0) {
        this.i= this.slides.length - 1;
    }
    this.showSlide(slides, i)
  }
  
  getNext(slides: any, i: any) {
    this.i = this.i + 1;
    if (this.i > this.slides.length - 1) {
        this.i= 0;
    }
    this.showSlide(slides, i)
  }

  goTo(slides: any, i: any) {
    this.i = i;
    this.showSlide(slides, i)
  }
  
  ngOnInit() {
    this.i = 0;
  } 

  ngOnDestroy() {

  }
}
