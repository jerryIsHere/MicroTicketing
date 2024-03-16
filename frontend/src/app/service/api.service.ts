import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly endpoint: string = "http://localhost:3000"
  //readonly endpoint: string = "https://micro-ticketing-api.vercel.app"
  constructor(public httpClient: HttpClient) { }
  getShowList(): Promise<object | undefined> {
    return this.httpClient.get(this.endpoint + "/shows").toPromise();
  }
  getShowInfo(id: string): Promise<object | undefined> {
    return this.httpClient.get(this.endpoint + `/show/${id}`).toPromise();
  }
  buy(showId: string, seatId: string, contactname: string): Promise<object | undefined> {
    return this.httpClient.post(this.endpoint + `/show/${showId}/ticket/${seatId}/buy`, {
      contactname: contactname
    }
    ).toPromise();
  }

}
