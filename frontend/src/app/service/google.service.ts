import { Injectable } from '@angular/core';
import { ShowInfo } from '../show-create/show-create.component';

@Injectable({
  providedIn: 'root'
})
/*
see 
https://developers.google.com/identity/oauth2/web/reference/js-reference
https://developers.google.com/drive/picker/reference
*/

export class GoogleService {

  // TODO(developer): Set to client ID and API key from the Developer Console
  private readonly CLIENT_ID = "242594859844-i3vag10vqadh1pl8ol2p3p8bptakq4ut.apps.googleusercontent.com";
  private readonly API_KEY = 'AIzaSyBmrhY1V7pPhsWqEIHLUZxE84gDUwzPJ1s';
  private readonly SERVICE_ACCOUNT_EMAIL = "showmanager@microticketing-416804.iam.gserviceaccount.com"

  // TODO(developer): Replace with your own project number from console.developers.google.com.
  private readonly APP_ID: string = "242594859844";
  //private picker;
  private apiScriptElement: HTMLScriptElement = document.createElement('script');
  private authScriptElement: HTMLScriptElement = document.createElement('script');

  getAccessToFile(result: google.picker.ResponseObject): Promise<gapi.client.HttpRequestFulfilled<any>> {
    return new Promise((resolve, reject) => {
      gapi.client.request({
        method: 'POST',
        path: `https://www.googleapis.com/drive/v2/files/${result.docs[0].id}/permissions`,
        params: {
          emailMessage: "MicroTicketing is requesting permission for this file."
        },
        body: {
          "name": "MicroTicketing",
          "type": "user",
          "role": "writer",
          "additionalRoles": [
            "commenter"
          ],
          "value": this.SERVICE_ACCOUNT_EMAIL,
        }
      }).then(function (response) {
        resolve(response)
      }, function (reason) {
        reject(reason)
      });
    })
  }
  setShowInfo(result: google.picker.ResponseObject, showInfo: ShowInfo): Promise<gapi.client.HttpRequestFulfilled<any>> {
    console.log(showInfo)
    return new Promise((resolve, reject) => {
      gapi.client.request({
        method: 'POST',
        path: `https://sheets.googleapis.com/v4/spreadsheets/${result.docs[0].id}:batchUpdate`,
        body: {
          "requests": [{
            "addSheet": {
              "properties": {
                "title": "microticketing-info",
              }
            }
          },
          {
            "addSheet": {
              "properties": {
                "title": "microticketing-seats",
              }
            }
          },
          ]
        }
      }).then(function (response) {
        gapi.client.request({
          method: 'POST',
          path: `https://sheets.googleapis.com/v4/spreadsheets/${result.docs[0].id}/values:batchUpdate`,
          body: {
            "valueInputOption": "RAW",
            "data": [
              {
                "range": "microticketing-info!A1:B1",
                "majorDimension": "COLUMNS",
                "values": [["date"], [showInfo.date]]
              },

              {
                "range": `microticketing-seats!A1:A${showInfo.seats}`,
                "majorDimension": "COLUMNS",
                "values": [[...Array(Number(showInfo.seats)).keys()].map(i => i + 1)]
              }
            ]
          }
        }).then(function (response) {
          resolve(response)
        }).catch((reason) => {
          reject(reason);
        })
      }, function (reason) {
        reject(reason)
      });
    })
  }
  openPicker(pickerCallback: (result: google.picker.ResponseObject) => void) {
    let tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.file',
      callback: (response) => {
        if (response.error !== undefined) {
          throw (response);
        }
        const picker = new google.picker.PickerBuilder()
          .setDeveloperKey(this.API_KEY)
          .setAppId(this.APP_ID)
          .setOAuthToken(response.access_token)
          .addView(google.picker.ViewId.SPREADSHEETS)
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
    return tokenClient
  }
  loadScripts() {
    let apiScriptPromise = new Promise((resolve, reject) => {
      this.apiScriptElement.type = 'text/javascript';
      this.apiScriptElement.src = "https://apis.google.com/js/api.js";
      this.apiScriptElement.onload = () => {
        Promise.all([
          gapi.load('client', () => {
            return gapi.client.init({
              'clientId': this.CLIENT_ID,
              'scope': 'https://www.googleapis.com/auth/drive.file',
            })
          }),
          gapi.load('client:picker', async () => {
            await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
          })])
      }
      document.getElementsByTagName('head')[0].appendChild(this.apiScriptElement);
    });
    let authScriptPromise = new Promise((resolve, reject) => {
      this.authScriptElement.type = 'text/javascript';
      this.authScriptElement.src = "https://apis.google.com/js/api.js";
      this.authScriptElement.onload = () => {
        resolve(null)
      }
      document.getElementsByTagName('head')[0].appendChild(this.authScriptElement);
    });
    return Promise.all([apiScriptPromise, authScriptPromise])
  }
  constructor() {
    this.loadScripts().then(() => { });
  }
}
