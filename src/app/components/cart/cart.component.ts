import { Component, OnInit } from '@angular/core';
import { CartService} from '../../core/services/cart.service';
import {MercadolibreService} from '../../core/services/mercadolibre.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  total: number;
  constructor(private cartService: CartService, private mercadolibreService: MercadolibreService) {
    this.total = 0;
    this.cartService.cartShopping.map(productId => {
      this.mercadolibreService.getProduct(productId).subscribe(product => {
        this.items.push(product);
        this.total += product.price;

      });
    });
  }
  ngOnInit(): void {
  }
  removeItem(itemId): void{
   this.cartService.cartShopping = this.cartService.cartShopping.filter( item => {
     return item !== itemId;
   });
   this.items = this.items.filter( item => {
      return item.id !== itemId;
    });
   this.calculeTotal();
  }
  calculeTotal(): void {
    this.total = 0;
    this.items.map( item => {
      this.total += item.price;
    });
  }

}
