import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import {Product} from '../../../products/interfaces/product'
import {SelectedAnchorsService} from '../../../shared//services/selected-anchors.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {CardBadgeService} from '../../../shared/services/card-badge.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private service:CartsService, private anchorService: SelectedAnchorsService, public dialog: MatDialog, private badgeServ: CardBadgeService) { }
  cartProducts:any[] = [];
  total:number = 0;
  success:boolean = false
  
  ngOnInit(): void {
    this.getCartProducts();

    this.anchorService.productIsSelected= false;
    this.anchorService.cartIsSelected= true;
    this.anchorService.adminIsSelected= false;
    
    const underline1: any = document.querySelector('.underline1');
    const underline2: any = document.querySelector('.underline2');
    const underline3: any = document.querySelector('.underline3');

    underline1.firstElementChild.firstElementChild.classList.remove('active');
    underline1.lastElementChild.firstElementChild.classList.remove('active');
    underline2.firstElementChild.firstElementChild.classList.add('active');
    underline2.lastElementChild.firstElementChild.classList.add('active');
    underline3.firstElementChild.firstElementChild.classList.remove('active');
    underline3.lastElementChild.firstElementChild.classList.remove('active');
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      for (let i= 0 ; i<this.cartProducts.length; i++)
        this.cartProducts[i].item.price = this.cartProducts[i].item.price.replace(/['"]+/g, '');
    }
    this.getCartTotal()
  }

  addAmount(index:number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  minsAmount(index:number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number) {
    this.cartProducts.splice(index , 1)
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    this.badgeServ.update(JSON.parse((localStorage.getItem("cart")!)).length);

  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts));
    this.badgeServ.update(JSON.parse((localStorage.getItem("cart")!)).length);

  }
  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {

      const dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          let products = this.cartProducts.map(item => {
            return {productId:item.item.id , quantity:item.quantity}
           })
        
            let Model = {
              userId:5,
              name: result.name,
              phone: result.phone,
              date: new Date()+"",
              products:products
            }
        
            this.service.createNewCart(Model);
            this.success = true;
        }
      });

   

  }
}
