import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly endpoint: string = "https://micro-ticketing-api.vercel.app/"
  constructor(public httpClient: HttpClient) { }
  getShowList(): Promise<object | undefined> {
    return this.httpClient.get(this.endpoint + "/shows").toPromise();
  }

}
