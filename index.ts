// src/index.js
import express, { Express, Request, Response } from "express";
import { api } from "./api/api"
import  url from "url";

const app: Express = express();
const port = process.env.PORT || 3000;=

app.get('/app/*', function (req, res) {
    res.redirect(url.format({
       pathname:"/frontend/dist/frontend/browser", // assuming that index.html lies on root route
       query: {
          "navigateTo": req.url,
        }
     }));
})


app.use("/api", api);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});