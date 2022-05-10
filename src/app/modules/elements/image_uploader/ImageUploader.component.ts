import { Component } from '@angular/core';
var imageArray:any[];        

@Component({
    selector: 'ImageUploader',
    templateUrl: './ImageUploader.component.html',
    styleUrls: ['./ImageUploader.component.css']
})
export class ImageUploaderComponent {
    constructor() {

    }
    gallery: any[] = [];
    count= 0;
    loadFile(event: any) {
        let image: any = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        this.gallery[this.count]=image;
        this.count = this.count + 1;
      }
    
    gallary: string[] = [];
    imageUpload(event: any) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => { this.gallary.push(e.target.result);};
      }  
    }
    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
