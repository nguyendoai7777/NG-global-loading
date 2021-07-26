import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setLoading(loadingState: boolean): void {
    this.isLoading.next(loadingState);
  }

}
