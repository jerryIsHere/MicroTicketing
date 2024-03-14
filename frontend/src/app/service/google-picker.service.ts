import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
/*
see 
https://developers.google.com/identity/oauth2/web/reference/js-reference
https://developers.google.com/drive/picker/reference
*/

export class GooglePickerService {
  public SCOPES: string = 'https://www.googleapis.com/auth/drive.file';

  // TODO(developer): Set to client ID and API key from the Developer Console
  private readonly CLIENT_ID = "242594859844-i56aphq64n5njgo09gt7e4j86530rlhu.apps.googleusercontent.com";
  private readonly API_KEY = 'AIzaSyBmrhY1V7pPhsWqEIHLUZxE84gDUwzPJ1s';

  // TODO(developer): Replace with your own project number from console.developers.google.com.
  private readonly APP_ID: string = "242594859844";
  //private picker;
  private apiScriptElement: HTMLScriptElement = document.createElement('script');
  private authScriptElement: HTMLScriptElement = document.createElement('script');

  openPicker(pickerCallback: (result: google.picker.ResponseObject) => void) {
    let tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (response) => {
        if (response.error !== undefined) {
          throw (response);
        }
        var folderView = new google.picker.DocsView()
          .setIncludeFolders(true) 
          .setMimeTypes('application/vnd.google-apps.folder')
          .setSelectFolderEnabled(true);
        const picker = new google.picker.PickerBuilder()
          .setDeveloperKey(this.API_KEY)
          .setAppId(this.APP_ID)
          .setOAuthToken(response.access_token)
          .addView(google.picker.ViewId.SPREADSHEETS)
          .addView(folderView)
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
  }
  loadScripts() {
    let apiScriptPromise = new Promise((resolve, reject) => {
      this.apiScriptElement.type = 'text/javascript';
      this.apiScriptElement.src = "https://apis.google.com/js/api.js";
      this.apiScriptElement.onload = () => {
        gapi.load('client:picker', async () => {
          await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
          resolve(null)
        });
        resolve(null)
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