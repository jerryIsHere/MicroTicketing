import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly endpoint: string = "https://micro-ticketing-api.vercel.app/"
  constructor(public httpClient:HttpClient) { }
  getDocumentsToken(picked: google.picker.ResponseObject, callback: (response: google.accounts.oauth2.TokenResponse) => void) {
   

  }

}
