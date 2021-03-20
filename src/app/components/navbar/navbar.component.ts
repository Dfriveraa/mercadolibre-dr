import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  search: string;
  constructor(public cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
  }
  makeSearch(): void {
    this.router.navigate(['/home'], {queryParams: {search: this.search }});
  }
  //replaced by bootstrap form
  onPressEnter(event): void {
    if (event.keyCode === 13) {
      this.makeSearch();
    }
  }
}
