import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSource = new BehaviorSubject(true);
  public loader$ = this.loadingSource.asObservable();

  constructor() { }

  show() {
    this.loadingSource.next(true);
  }

  hide() {
    this.loadingSource.next(false);
  }
}
