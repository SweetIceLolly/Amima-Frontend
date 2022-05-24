import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { faPenToSquare, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'ProfilePage',
  templateUrl: './ProfilePage.component.html',
  styleUrls: ['./ProfilePage.component.css']
})
export class ProfilePageComponent {
  id: string = '';
  faPenToSquare = faPenToSquare;
  faArrowAltCircleRight = faArrowAltCircleRight;


  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {

  }
}
