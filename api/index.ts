import express, { Express, Request, Response, Router } from "express";
import google from "googleapis"

const api: Express = express();
const port = process.env.PORT || 3000;

var crediential = {
  "web": {
    "client_id": process.env.client_id,
    "project_id": process.env.project_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_secret": process.env.client_secret
  }
}


api.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
api.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});