import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class CartService {

  cartShopping: any[] = [];
  cartSize: number;
  constructor() { 
    this.cartSize = 0
  }
  addItem(itemId): void{
    this.cartSize +=1;
    this.cartShopping.push(itemId);
  }
  removeItem(itemId): void{
    this.cartShopping = this.cartShopping.filter( item => {
      return item !== itemId;
    });
    this.cartSize -=1;
  }
}
