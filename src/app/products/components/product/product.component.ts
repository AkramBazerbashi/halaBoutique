import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import {SelectedAnchorsService} from '../../../shared//services/selected-anchors.service'
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // db :any;
  // imagePath!: string;

  @Input() data!:Product;
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0

  constructor(private service: SelectedAnchorsService) { 
    // const app = initializeApp(environment.firebaseConfig);
    // this.db = getFirestore(app);
    // this.addImage();
  }

  // async addImage(){
  //   const querySnapshot = await getDocs(collection(this.db, "image"));
  //   querySnapshot.forEach((doc) => {
  //     this.imagePath= JSON.stringify(doc.data()["imagePath"][1]).replace(/['"]+/g, '');
  //     console.log(this.imagePath);
  //   });
  // }

  ngOnInit(): void {
        this.service.productIsSelected= true;
        this.service.cartIsSelected= false;
        this.service.adminIsSelected= false;
        
        const underline1: any = document.querySelector('.underline1');
        const underline2: any = document.querySelector('.underline2');
        const underline3: any = document.querySelector('.underline3');

        underline1.firstElementChild.firstElementChild.classList.add('active');
        underline1.lastElementChild.firstElementChild.classList.add('active');
        underline2.firstElementChild.firstElementChild.classList.remove('active');
        underline2.lastElementChild.firstElementChild.classList.remove('active');
        underline3.firstElementChild.firstElementChild.classList.remove('active');
        underline3.lastElementChild.firstElementChild.classList.remove('active');
  }


  add() {
    this.item.emit({item:this.data ,quantity:this.amount })
  }

}

