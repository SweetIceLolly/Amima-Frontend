import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { PostController } from "../../../controllers/post.controller";
import { environment } from "src/environments/environment"

@Component({
  selector: 'ImageUploader',
  templateUrl: './ImageUploader.component.html',
  styleUrls: ['./ImageUploader.component.css']
})

export class ImageUploaderComponent {
  faSquarePlus = faSquarePlus;
  faTrashCan = faTrashCan
  @Input() max: number = 10;
  @Input() min: number = 1;
  @Input() images: any[] = [];
  @Output() changeEvent = new EventEmitter<any[]>();

  constructor(
    private sanitizer: DomSanitizer,
    private postCtrl: PostController
  ) { }

  loadFile(event: any) {
    for (let file of event.target.files) {
      if (this.images.length < this.max) {
        const currIndex = this.images.push({
          src: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
          filename: '',
          uploadFailed: false
        });
        this.postCtrl.uploadPostImage(file)
          .then(res => {
            this.images[currIndex - 1].filename = res.imageId + '.png';
            this.changeEvent.emit(this.images);
          })
          .catch(err => {
            this.images[currIndex - 1].uploadFailed = true;
          });
      } else {
        break;
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.changeEvent.emit(this.images);
  }

  openImage(index: number) {
    if (this.images[index].filename) {
      window.open(`${environment.postImageUrl}/${this.images[index].filename}`);
    }
  }

  imgLoadError(index: number) {
    this.images[index].uploadFailed = true;
  }
}
