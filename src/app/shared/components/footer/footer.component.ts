import { Component, OnInit } from '@angular/core';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faHeart = faHeart;
  // faFacebook = faFacebook;
  // faInstagram = faInstagram;

  date= new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
