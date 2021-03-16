import {Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MercadolibreService {
  env = environment;
  @Input() search: string;

  constructor(private http: HttpClient) {

  }
  getProducts(item, offset): Observable<any>{
    if (offset){
        return this.http.get<any>(this.env.apiMercadolibre + 'q=' + item + '&offset=' + offset);
    }
    else {
      console.log(this.env.apiMercadolibre + 'q=' + item);
      return this.http.get<any>(this.env.apiMercadolibre + 'q=' + item);
    }
  }
  getSellerName(seller): Observable<any>{
    return this.http.get<any>(this.env.apiUserMercadolibre + seller);
  }
}