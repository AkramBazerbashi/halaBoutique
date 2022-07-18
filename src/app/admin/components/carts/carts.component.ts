import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {AdminCartsService} from '../../services/admin-carts.service';
import {AdminCarts} from '../../interfaces/admin-carts';
import { Product } from '../../../products/interfaces/product';
import {ProductsService} from '../../../products/services/products.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ViewDialogComponent} from '../view-dialog/view-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import {SelectedAnchorsService} from '../../../shared//services/selected-anchors.service'

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  hide = true;
  adminCarts!: AdminCarts[];
  viewCart: [{item: Product, quantity: number}]= [{item: {id:0, title: "", image: [""], description: "", price: "0" }, quantity: 0}];
  name = new FormControl('', [Validators.required]);
  
  password = new FormControl('', [Validators.required]);
  validLogin: boolean= false;
  
  constructor(private service: AdminCartsService, private productService: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar, private anchorService: SelectedAnchorsService) { }

  ngOnInit(): void {
    this.getAllCarts();

    this.anchorService.productIsSelected= false;
    this.anchorService.cartIsSelected= false;
    this.anchorService.adminIsSelected= true;
    
    const underline1: any = document.querySelector('.underline1');
    const underline2: any = document.querySelector('.underline2');
    const underline3: any = document.querySelector('.underline3');

    underline1.firstElementChild.firstElementChild.classList.remove('active');
    underline1.lastElementChild.firstElementChild.classList.remove('active');
    underline2.firstElementChild.firstElementChild.classList.remove('active');
    underline2.lastElementChild.firstElementChild.classList.remove('active');
    underline3.firstElementChild.firstElementChild.classList.add('active');
    underline3.lastElementChild.firstElementChild.classList.add('active');
  }

  async getAllCarts(){
    this.adminCarts= this.service.adminCarts;
    
  }

  deleteCart(id: number){
    this.service.deleteCart(id);
    this.getAllCarts();
      this._snackBar.open("Cart was deleted successfully", "Please reload the page!",{
        duration: 8000
      });
  }

  view(index: number){
    this.viewCart.splice(0,this.viewCart.length);
    for (let i= 0; i< this.adminCarts[index].products.length; i++)
    this.viewCart.push({item: this.productService.getProductById(this.adminCarts[index].products[i].productId)!, quantity: this.adminCarts[index].products[i].quantity});

    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '1000px',
      data: this.viewCart,
    });
  }

  login(){
    if (this.name.value == "hala" && this.password.value == "19992022")
      this.validLogin= true;
  }
}
