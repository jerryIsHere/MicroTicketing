import express, { Express, Request, Response, Router } from "express";
import admin from 'firebase-admin';
import cors from 'cors';
import { show } from './src/show';
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { sheets_v4 } from "googleapis"
const api: Express = express();
var corsOptions = {
  origin: 'https://micro-ticketing.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
api.use(cors(corsOptions))
const port = process.env.PORT || 3000;
var db = admin.firestore();

var googleapis_crediential = {
  clientId: process.env.oauth_web_client_id,
  clientSecret: process.env.oauth_web_client_secret,
}
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.firebase_private_key ? process.env.firebase_private_key.replace(/\\n/g, '\n') : undefined,
    clientEmail: process.env.firebase_client_email,
    projectId: process.env.firebase_project_id
  })
});

api.post("/show/create", (req: Request, res: Response) => {
  var showPromise = show.create().then((result: GaxiosResponse<sheets_v4.Schema$ValueRange>) => {
    res.send(result);
  }).catch((reason) => {
    res.send("reason\n" + reason);
  });
  ;
  res.send
})

api.listen(port, () => {
  admin;
  console.log(`[server]: Server is running at http://localhost:${port}`);
});