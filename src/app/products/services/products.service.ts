import { Injectable } from '@angular/core';
import {Product} from '../interfaces/product';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {environment} from '../../../environments/environment'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  products: Product[] =[];
  db :any;
  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    this.initProducts();
    
  }

  async initProducts(){
      const querySnapshot = await getDocs(collection(this.db, "products"));
      let i=0;
      querySnapshot.forEach((doc) => {
        this.products[i]= {id: 0, title: "", description: "", price: "", image: []};
        this.products[i].id= +JSON.stringify(doc.data()["id"]).replace(/['"]+/g, '');
        this.products[i].title= JSON.stringify(doc.data()["title"]).replace(/['"]+/g, '');
        this.products[i].description= JSON.stringify(doc.data()["description"]).replace(/['"]+/g, '');
        this.products[i].price= JSON.stringify(doc.data()["price"]).replace(/['"]+/g, '');
        for(let j= 0; j< doc.data()["image"].length; j++){
          this.products[i].image[j]= JSON.stringify(doc.data()["image"][j]).replace(/['"]+/g, '');
        }
        i++;
      });
    }

  // products: Product[] = [
  //   {id: 1,
  //     title: "ورد صناعي مشغول يدويا من الريبان",
  //     image: ["assets\\1a.jpg", "assets\\1b.jpg", "assets\\1c.jpg"],
  //     description: "اللون حسب الطلب, ممكن التنفيذ مع التمثال او بدونه",
  //     // category: "1",
  //     price: "70",
  //   },
  //   {id: 2,
  //     title: "سجادة صلاة",
  //     image: ["assets\\2a.jpg", "assets\\2b.jpg", "assets\\2c.jpg"],
  //     description: "مشغولة من الايتامين يدويا ومغلفة بالساتات ، اللون حسب الطلب",
  //     // category: "2",
  //     price: "400",
  //   },
  //   {id: 3,
  //     title: "طارة للطفل",
  //     image: ["assets\\3a.jpg", "assets\\3b.jpg", "assets\\3c.jpg"],
  //     description: "مشغولة يدويا اللون والشكل والايطار الخشبي حسب الطلب",
  //     // category: "3",
  //     price: "150",
  //   },
  //   {id: 4,
  //     title: "صينية ايتامين",
  //     image: ["assets\\4a.jpg", "assets\\4b.jpg", "assets\\4c.jpg"],
  //     description: " مشغولة يدويا ممكن يتنفذ باشكال والوان مختلفه حسب ذوقكن",
  //     // category: "3",
  //     price: "500",
  //   },
  // ];

  getAllProducts(){
    return this.products;
  }

  // getAllCategories(){
  //   let categories :string[] =[];
  //   for (let i=0; i< this.products.length; i++){
  //     categories.push(this.products[i].category);
  //   }
  //   return categories;
  // }

  // getProductsByCategory(keyword: string){
  //   let products :Product[] =[];
  //   for (let i=0; i< this.products.length; i++){
  //     if (this.products[i].category == keyword)
  //     products.push(this.products[i]);
  //   }
  //   return products;
  // }

  getProductById(id: number){
    for(let i= 0; i< this.products.length; i++)
      if (this.products[i].id == id)
        return this.products[i];
    return null;
  }


}
