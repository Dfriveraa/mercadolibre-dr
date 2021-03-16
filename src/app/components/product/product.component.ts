import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.product = history.state;
    if (this.product.navigationId === 1){
      this.router.navigate(['/home']);
    }
  }

}
