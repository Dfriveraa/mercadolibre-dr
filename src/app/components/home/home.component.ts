import {Component, Input, OnInit} from '@angular/core';
import {MercadolibreService} from '../../core/services/mercadolibre.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slider = [
    {
      src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mco-home-desktop-slider-picture-9da47314-157a-4270-81b1-8ec999313eca.jpg',
      search: 'Licores'
    },
    {
      src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mco-home-desktop-slider-picture-e8adad68-f714-4c67-b37b-0c95a1432307.jpg',
      search: 'Electrodomésticos'
    },
    {
      src: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mco-home-desktop-slider-picture-f2452add-8bf6-4852-9cc1-10b5b746c329.jpg',
      search: 'Gimnasia'
    }
  ];
  results: any[] = [];
  itemSearch: string;
  offset: number;
  constructor(private mercadolibreService: MercadolibreService, private route: ActivatedRoute, private router: Router) {
    this.offset = 0;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.itemSearch = params.search;
      this.offset = 0;
      this.search(this.itemSearch, 0);
    });

  }
  search(item, offset): void{
    this.results = [];
    this.mercadolibreService.getProducts(item , offset).subscribe(data => {
      data.results.map(product => {
        product.imgHd = product.thumbnail.replace('-I', '-V');
        this.mercadolibreService.getSellerName(product.seller.id).subscribe(name => {
          product.seller_name = name.nickname;
        });
        this.results.push(product);
      });
      console.log(this.results);
    });
  }
  toProduct(productID): void{
    this.router.navigate(['/product'], {queryParams: {productId: productID }});
  }
  nextPage(): void{
    this.offset += 1;
    this.search(this.itemSearch, this.offset);
  }
  previousPage(): void{
    this.offset -= 1;
    this.search(this.itemSearch, this.offset);
  }
  toPage(pageNumber): void{
    this.offset = pageNumber;
    this.search(this.itemSearch, this.offset);
  }



}
