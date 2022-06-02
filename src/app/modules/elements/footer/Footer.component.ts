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
  }

  goAbout() {
    this.router.navigate(['about']);
  }

  ngOnInit() {

  }
 
  ngOnDestroy() {

  }
  
}
