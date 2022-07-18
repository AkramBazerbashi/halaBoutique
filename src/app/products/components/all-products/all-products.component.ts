import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {Product} from '../../interfaces/product';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {environment} from '../../../../environments/environment';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import {CardBadgeService} from '../../../shared/services/card-badge.service'
import { of } from 'rxjs';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, AfterViewChecked {
  // db :any;
  // imgPath!:string;

  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts :any[] = [];
  constructor(private service: ProductsService, private badgeServ: CardBadgeService) {
    // const app = initializeApp(environment.firebaseConfig);
    // this.db = getFirestore(app);
   }

  ngOnInit(): void {
    this.getProducts();

    // this.getImage();

  }

  // async getImage(){
  //   const querySnapshot = await getDocs(collection(this.db, "image"));
  //   querySnapshot.forEach((doc) => {
  //     this.imgPath= JSON.stringify(doc.data()["imagePath"]).replace(/['"]+/g, '');
  //     console.log("🚀 ~ file: all-products.component.ts ~ line 38 ~ AllProductsComponent ~ querySnapshot.forEach ~ this.imgPath", this.imgPath)
      
  //   });
  // }

  ngAfterViewChecked(){
    // this.getCategories();

  }

  getProducts(){
    this.loading= true;
    this.products= this.service.getAllProducts();
    this.loading= false;

  }

  // getCategories(){
  //   this.loading= true;
  //   this.categories= this.service.getAllCategories();
  //   this.loading= false;
  // }

  // filterCategory(event: any){
  //   this.loading= true;
  //   if (event.target.value == "all"){
  //     this.getProducts();
  //     this.loading= false;
  //   }
  //   else{
  //     this.products= this.service.getProductsByCategory(event.target.value);
  //     this.loading= false;
  //   }

  // }

  addToCart(event:any){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("Product is already in your cart")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }

    this.badgeServ.update(JSON.parse((localStorage.getItem("cart")!)).length);
  }
}
