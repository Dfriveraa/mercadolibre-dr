import {Component, OnInit} from '@angular/core';
import {MercadolibreService} from '../../core/services/mercadolibre.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  search: string;
  constructor(private mercadolibreService: MercadolibreService, private router: Router) {
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
