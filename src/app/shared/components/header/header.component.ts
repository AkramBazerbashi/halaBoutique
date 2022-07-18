import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {SelectedAnchorsService} from '../../services/selected-anchors.service';
import { faCartShopping, faUser, faStore  } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {CardBadgeService} from '../../services/card-badge.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  faCartShopping = faCartShopping;
  faUser = faUser;
  faStore = faStore;

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  
  cardSize!: string ;

  constructor(private service: SelectedAnchorsService, private badgeServ: CardBadgeService) { 
  
  }
  
  ngOnInit(): void {
  
    this.badgeServ.currentCardSize.subscribe((res)=>{
      this.cardSize = res;
      console.log(this.cardSize);
    })

    console.log(this.cardSize);
    const underline1: any = document.querySelector('.underline1');
    const underline2: any = document.querySelector('.underline2');
    const underline3: any = document.querySelector('.underline3');
    const productsAnch : any = document.getElementById('productsAnch');
    const cartAnch: any = document.getElementById('cartAnch');
    const adminAnch: any = document.getElementById('adminAnch');


    productsAnch.addEventListener('mouseover', () => {
      underline1.firstElementChild.firstElementChild.classList.add('active');
      underline1.lastElementChild.firstElementChild.classList.add('active');
  })
  
  productsAnch.addEventListener('mouseout', () => {
      if (!this.service.productIsSelected) {
          underline1.firstElementChild.firstElementChild.classList.remove('active');
          underline1.lastElementChild.firstElementChild.classList.remove('active');
      }
  
  })

  cartAnch.addEventListener('mouseover', () => {
    underline2.firstElementChild.firstElementChild.classList.add('active');
    underline2.lastElementChild.firstElementChild.classList.add('active');
})

cartAnch.addEventListener('mouseout', () => {
    if (!this.service.cartIsSelected) {
        underline2.firstElementChild.firstElementChild.classList.remove('active');
        underline2.lastElementChild.firstElementChild.classList.remove('active');
    }

})

adminAnch.addEventListener('mouseover', () => {
    underline3.firstElementChild.firstElementChild.classList.add('active');
    underline3.lastElementChild.firstElementChild.classList.add('active');
})

adminAnch.addEventListener('mouseout', () => {
    if (!this.service.adminIsSelected) {
        underline3.firstElementChild.firstElementChild.classList.remove('active');
        underline3.lastElementChild.firstElementChild.classList.remove('active');
    }

})

  // window.onload = function () {
  //   this.service.productIsSelected = true;
  //   underline1.firstElementChild.firstElementChild.classList.add('active');
  //   underline1.lastElementChild.firstElementChild.classList.add('active');
  // }

  }

}
