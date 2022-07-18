import { Injectable } from '@angular/core';
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {environment} from '../../../environments/environment';
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartId: number= 1;
  models: any[]= [];
  db :any;
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);

  }

  async createNewCart(model: any){
    // this.models.push(model);
    let cartId: string= "";
    const querySnapshot = await getDocs(collection(this.db, "cartsId"));
    querySnapshot.forEach((doc) => {
      this.cartId = +JSON.stringify(doc.data()).match(/\d/)!;
      ++this.cartId;
      cartId= doc.id;
    });
    await deleteDoc(doc(this.db, "cartsId", cartId));
    
    const docRef = await addDoc(collection(this.db, "carts"), {
      cartsId: this.cartId,
      date: model.date,
      userId: model.userId,
      phone: model.phone,
      name: model.name
    });
      
    for (let i= 0; i< model.products.length; i++){
      const docRef2 = await addDoc(collection(this.db, "cartProducts"), {
        cartsId: this.cartId,
        productId: model.products[i].productId,
        quantity: model.products[i].quantity
      });
    }

    const docRef3 = await addDoc(collection(this.db, "cartsId"), {
      cartsId: this.cartId,
    });
  


  }
}
