import {Component, OnInit} from '@angular/core';
import {MercadolibreService} from '../../core/services/mercadolibre.service';
import {Router} from '@angular/router';
import {NavbarService} from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  search: string;
  constructor(private mercadolibreService: MercadolibreService, private navbarService: NavbarService, private router: Router) {
  }

  ngOnInit(): void {
    this.mercadolibreService.search = this.search;

  }
  makeSearch(): void {
    this.mercadolibreService.search = this.search;
    this.router.navigate(['/home']);
    this.navbarService.makeSearch(this.search);
  }

  onPressEnter(event): void {
    if (event.keyCode === 13) {
      this.makeSearch();
    }
  }
}
