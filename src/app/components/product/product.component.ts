import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MercadolibreService} from '../../core/services/mercadolibre.service';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product = {
    id: '',
    title: '',
    price: 0,
    pictures: [{url: ''}],
    descriptions: [{plain_text: ''}],
    seller: '',
    available_quantity: 0,
    shipping: false,
    original_price: null,
    discount: null
  };
  constructor(private route: ActivatedRoute, private mercadolibreService: MercadolibreService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product.id = params.productId;
      this.setInfo(params.productId);
      this.setDescription(params.productId);
    });
  }
  setDescription(productId): void {
    this.mercadolibreService.getDescription(productId).subscribe(description => {
      this.product.descriptions = description;
    });
  }
  setSeller(sellerId): void {
    this.mercadolibreService.getSellerName(sellerId).subscribe(seller => {
      this.product.seller = seller.nickname;
    });
  }
  setInfo(productId): void {
    this.mercadolibreService.getProduct(productId).subscribe( product => {
      const { title, price, pictures, available_quantity, shipping, original_price} = product;
      this.setSeller(product.seller_id);
      this.product.title = title;
      this.product.price = price;
      this.product.pictures = pictures;
      this.product.available_quantity = available_quantity;
      this.product.shipping = shipping.free_shipping;
      if (original_price !== null){
        this.product.discount = this.calculateDiscount(price, original_price);
        console.log(this.calculateDiscount(price,original_price));  
      }
    });
  }
  addToCart(): void {
    this.cartService.addItem(this.product.id);
  }
  calculateDiscount(price, originalPrice){
    let discount = 100 - (price*100)/originalPrice
    return Math.round(discount);
  };
}
