import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MercadolibreService} from '../../core/services/mercadolibre.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product = {
    title: '',
    price: 0,
    pictures: [{url: ''}],
    descriptions: [{plain_text: ''}],
    seller: '',
    available_quantity: 0,
    shipping: false
  };
  constructor(private route: ActivatedRoute, private mercadolibreService: MercadolibreService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
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
      const { title, price, pictures, available_quantity, shipping} = product;
      this.setSeller(product.seller_id);
      this.product.title = title;
      this.product.price = price;
      this.product.pictures = pictures;
      this.product.available_quantity = available_quantity;
      this.product.shipping = shipping.free_shipping;
    });
  }

}
