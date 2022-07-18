import { Injectable } from '@angular/core';
import {CartsService} from '../../carts/services/carts.service'
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {environment} from '../../../environments/environment';
import {AdminCarts} from '../interfaces/admin-carts';
import {Product} from '../..../../../products/interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class AdminCartsService {

  db :any;
  adminCarts: AdminCarts[] = [{date: "", userId: 0, cartsId: 0, products: [{cartsId: 0, productId: 0, quantity: 0}, ], name: "", phone: ""}];
  constructor(private cardService: CartsService) { 
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    
    this.getAllCarts();

  }



  async getAllCarts(){
    // return this.cardService.models;
    this.adminCarts.splice(0,this.adminCarts.length )
    let i =0, topI=0;
    const querySnapshot = await getDocs(collection(this.db, "carts"));
    querySnapshot.forEach((doc) => {
      this.adminCarts[i] = {date: "", cartsId: 0, userId:0, products: [{cartsId: 0, productId: 0, quantity: 0}, ], name: "", phone: ""};
      this.adminCarts[i].date= JSON.stringify(doc.data()["date"]);
      this.adminCarts[i].cartsId= +JSON.stringify(doc.data()["cartsId"]);
      this.adminCarts[i].userId= +JSON.stringify(doc.data()["userId"]);
      this.adminCarts[i].name= JSON.stringify(doc.data()["name"]);
      this.adminCarts[i].phone= JSON.stringify(doc.data()["phone"]);
      

      topI= i;
      i++;
    });
    for(let k=0 ; k<= topI; k++){
      let j =0;
      const querySnapshot2 = await getDocs(collection(this.db, "cartProducts"));
      querySnapshot2.forEach((doc) => {
        if(this.adminCarts[k].cartsId == +JSON.stringify(doc.data()["cartsId"])){
          this.adminCarts[k].products[j]= {cartsId: 0, productId: 0, quantity:0};
          this.adminCarts[k].products[j].cartsId= +JSON.stringify(doc.data()["cartsId"]);
          this.adminCarts[k].products[j].productId= +JSON.stringify(doc.data()["productId"]);
          this.adminCarts[k].products[j].quantity= +JSON.stringify(doc.data()["quantity"]);
          j++;
        }
      });
    }
  }

  async deleteCart(id: number){
    let docId :string ="", cartProductId: string[]= [];
    const querySnapshot = await getDocs(collection(this.db, "carts"));
    querySnapshot.forEach((doc) => {
      if (doc.data()["cartsId"] == id)
      docId= doc.id;
    });

    const querySnapshot2 = await getDocs(collection(this.db, "cartProducts"));
    querySnapshot2.forEach((doc) => {
      if (doc.data()["cartsId"] == id)
      cartProductId.push(doc.id);
    });

    await deleteDoc(doc(this.db, "carts", docId));
    for(let i= 0; i< cartProductId.length; i++)
    await deleteDoc(doc(this.db, "cartProducts", cartProductId[i]));
    
  }
}
