import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})

export class FooterComponent {

    constructor(
      private router: Router
    ) {}

  goHome() {
    this.router.navigate(['/']);
    window.scroll(0, 0);
  }

  goAbout() {
    this.router.navigate(['about']);
    window.scroll(0, 0);
  }

  goContact() {
    this.router.navigate(['about']).then(() => {
      setTimeout(() => {
        window.scroll(0, document.body.scrollHeight);
      }, 200);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
