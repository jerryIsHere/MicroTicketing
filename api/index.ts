import express, { Express, Request, Response, Router } from "express";
import google from "googleapis"
import admin from 'firebase-admin';

const api: Express = express();
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
  var oauth2Client = new google.Auth.OAuth2Client({...googleapis_crediential, redirectUri: ""})
  const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.send("firebase collections: " + db.listCollections() + "\n oauth url: " + url);

});
api.listen(port, () => {
  admin;
  console.log(`[server]: Server is running at http://localhost:${port}`);
});