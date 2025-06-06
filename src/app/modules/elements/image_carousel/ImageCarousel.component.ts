import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ImageCarousel',
  templateUrl: './ImageCarousel.component.html',
  styleUrls: ['./ImageCarousel.component.css']
})


export class ImageCarouselComponent {
  i!:number;
  @Input() slides: string [] = [];

  showSlide(slides: { [x: string]: any; }, i: string | number) {
    return slides[i];
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
