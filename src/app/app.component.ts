import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingIndicatorService } from './core/services/loading-indicator.service';

export interface Item {
  _id: string;
  name: string;
  desc: string;
  qty: number;
}

export interface ItemResponse {
  data: Item[],
  message: string;
  status: string;
  statusCode: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/* export const specialMailValidation = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const MAIL_PATTERN = /\w+([-_]?\w+)*@\w+([-_]?\w+)*(\.+\w{2})+/i;
    const
      return
  }
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form = this.fb.group({
    emailFormControl: ['', [
      Validators.required,
      Validators.email,
    ]]
  })
  matcher = new MyErrorStateMatcher();
  _isLoading!: boolean;
  isLoading: BehaviorSubject<boolean> = this.loadingIndicatorService.isLoading;
  response!: Item[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
  }

  ngOnInit() {
    this.getAllItems();
    this.loadingIndicatorService.isLoading.subscribe(next => {

      this._isLoading = next;
      console.log(this._isLoading)
    })
  }

  getAllItems() {
    this.fetchApi().subscribe((response) => {
      if (response.body) {
        this.response = response.body.data;
        console.log(this.response);
      }
    })
  }

  fetchApi(): Observable<HttpResponse<ItemResponse>> {
    return this.http.get<ItemResponse>('http://localhost:3333/items', { observe: 'response' });
  }
}
