import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MercadolibreService} from '../../core/services/mercadolibre.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: any;
  constructor(private route: ActivatedRoute, private mercadolibreService: MercadolibreService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mercadolibreService.getProduct(params.productId).subscribe( product => {
        this.product = product;
        console.log(this.product);
      });
    });
  }

}
