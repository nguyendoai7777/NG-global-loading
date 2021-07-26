import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(
    private _isLoading: LoadingIndicatorService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._isLoading.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => this._isLoading.setLoading(false))
    );
  }
}


