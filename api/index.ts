import express, { Express, Request, Response, Router } from "express";
//import admin from 'firebase-admin';
// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: process.env.firebase_private_key ? process.env.firebase_private_key.replace(/\\n/g, '\n') : undefined,
//     clientEmail: process.env.firebase_client_email,
//     projectId: process.env.firebase_project_id
//   })
// });

// var db = admin.firestore();
import cors from 'cors';
import { show } from './src/show';
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { drive_v3, sheets_v4 } from "googleapis"
import { ticket } from "./src/ticket";

const port = process.env.PORT || 3000;
const api: Express = express();
var corsOptions = {
  origin: 'https://micro-ticketing.vercel.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
api.use(cors(corsOptions))




api.get("/show/:showId", (req: Request, res: Response) => {
  var showPromise = show.get(req.params.showId).then((result: any) => {
    res.send(result);
  }).catch((reason: any) => {
    res.send("reason\n" + reason);
  });
  res.send
})

api.get("/shows", (req: Request, res: Response) => {
  var showPromise = show.list().then((result: drive_v3.Schema$File[]) => {
    res.send(result);
  }).catch((reason) => {
    res.send("reason\n" + reason);
  });
  ;
  res.send
})

api.post("/show/:showId/ticket/:seatId/buy", (req: Request, res: Response) => {
  if (req.body.contactname)
    var showPromise = ticket.get(req.params.showId, req.params.seatId, req.body.contactname).then((result) => {
      res.send(result);
    }).catch((reason) => {
      res.send("reason\n" + reason);
    });
  ;
  res.send
})

api.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});