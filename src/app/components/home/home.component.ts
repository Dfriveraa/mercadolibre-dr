import {Component, Input, OnInit} from '@angular/core';
import {MercadolibreService} from '../../core/services/mercadolibre.service';
import {Router} from '@angular/router';
import {NavbarService} from '../navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  results: any[] = [];
  itemSearch: string;
  constructor(private mercadolibreService: MercadolibreService, private navbarService: NavbarService, private router: Router) {
    this.itemSearch = this.mercadolibreService.search;
  }
  ngOnInit(): void {
    this.navbarService.change.subscribe(newsearch => {
      this.itemSearch = newsearch;
      this.search(this.itemSearch, 0);
    });
    this.search(this.itemSearch, 0);
  }
  search(item, offset): void{
    this.results = [];
    this.mercadolibreService.getProducts(item , offset).subscribe(data => {
      data.results.map(product => {
        this.mercadolibreService.getSellerName(product.seller.id).subscribe(name => {
          product.seller_name = name.nickname;
        });
        this.results.push(product);
      });
    });
  }
  toProduct(product): void{
    this.router.navigateByUrl('/product', {state: product});
  }



}
