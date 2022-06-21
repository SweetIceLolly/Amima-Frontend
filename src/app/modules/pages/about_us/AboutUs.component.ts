import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent {
  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
  faFacebookF = faFacebookF;
  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
