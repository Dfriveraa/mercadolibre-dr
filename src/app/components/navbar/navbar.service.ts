import { Injectable , Output, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  search: string;
  @Output() change: EventEmitter<any> = new EventEmitter();

  makeSearch(search): void{
    this.search = search;
    this.change.emit(this.search);
  }
  constructor() { }
}
