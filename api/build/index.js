"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import admin from 'firebase-admin';
// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: process.env.firebase_private_key ? process.env.firebase_private_key.replace(/\\n/g, '\n') : undefined,
//     clientEmail: process.env.firebase_client_email,
//     projectId: process.env.firebase_project_id
//   })
// });
// var db = admin.firestore();
const cors_1 = __importDefault(require("cors"));
const show_1 = require("./src/show");
const api = (0, express_1.default)();
var corsOptions = {
    origin: 'https://micro-ticketing.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
api.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT || 3000;
api.get("/show/:showId", (req, res) => {
    var showPromise = show_1.show.get(req.params.showId).then((result) => {
        res.send(result);
    }).catch((reason) => {
        res.send("reason\n" + reason);
    });
    res.send;
});
api.get("/shows", (req, res) => {
    var showPromise = show_1.show.list().then((result) => {
        res.send(result);
    }).catch((reason) => {
        res.send("reason\n" + reason);
    });
    ;
    res.send;
});
api.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
