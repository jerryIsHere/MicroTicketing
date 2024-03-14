import express, { Express, Request, Response, Router } from "express";
import { sheets_v4, google } from "googleapis"
import { GaxiosResponse } from 'gaxios';
import admin from 'firebase-admin';
import cors from 'cors';

const api: Express = express();
var corsOptions = {
  origin: 'https://micro-ticketing.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
api.use(cors(corsOptions))
const port = process.env.PORT || 3000;

var googleapis_crediential = {
  clientId: process.env.googleapis_web_client_id,
  clientSecret: process.env.googleapis_web_client_secret
}

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.firebase_private_key,
    clientEmail: process.env.firebase_client_email,
    projectId: process.env.firebase_project_id
  })
});


api.get("/", (req: Request, res: Response) => {
  var db = admin.firestore();
  var oauth2Client = new google.auth.OAuth2({ ...googleapis_crediential, redirectUri: "" })
  const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  const service = google.sheets({ version: 'v4', auth: oauth2Client });
  service.spreadsheets.values.get({
    spreadsheetId: "1_oATschOmqj7VGrqj4zYLnaGEfUR0KEFrHiV60gbyQM",
    range: "B2:B3",
  }).then((result: GaxiosResponse<sheets_v4.Schema$ValueRange>) => {
    res.send("firebase collections: " + db.listCollections() + "\n" + result.data.values);
  }).catch((reason) => {
    res.send("firebase collections: " + db.listCollections() + "\n" + reason);
  });

});
api.listen(port, () => {
  admin;
  console.log(`[server]: Server is running at http://localhost:${port}`);
});