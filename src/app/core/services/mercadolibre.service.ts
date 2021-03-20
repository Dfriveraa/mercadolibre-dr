import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MercadolibreService {
  env = environment;

  constructor(private http: HttpClient) {

  }
  getProducts(item, offset): Observable<any>{
    if (offset){
        return this.http.get<any>(this.env.APIPRODUCTS + 'q=' + item + '&offset=' + (offset*50));
    }
    else {
      return this.http.get<any>(this.env.APIPRODUCTS + 'q=' + item);
    }
  }
  getSellerName(seller): Observable<any>{
    return this.http.get<any>(this.env.APIUSERS + seller);
  }

  getProduct(productId): Observable<any>{
    return  this.http.get<any>(this.env.APIPRODUCT + productId);
  }
  getDescription(productId): Observable<any>{
    return this.http.get<any>(this.env.APIPRODUCT + productId + '/descriptions');
  }
}
