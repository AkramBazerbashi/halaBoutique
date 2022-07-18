import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardBadgeService {

  private cardSize = new BehaviorSubject<string>("0");
  currentCardSize = this.cardSize.asObservable();
  constructor() { 
    if("cart" in localStorage) {
      this.cardSize.next(JSON.parse((localStorage.getItem("cart")!)).length);
    }
  }
  update(value: string){
    this.cardSize.next(value);
  }

}
