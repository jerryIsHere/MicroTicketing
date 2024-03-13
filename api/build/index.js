"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleapis_1 = __importDefault(require("googleapis"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const api = (0, express_1.default)();
const port = process.env.PORT || 3000;
var googleapis_crediential = {
    clientId: process.env.googleapis_web_client_id,
    clientSecret: process.env.googleapis_web_client_secret
};
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        privateKey: process.env.firebase_private_key,
        clientEmail: process.env.firebase_client_email,
        projectId: process.env.firebase_project_id
    })
});
api.get("/", (req, res) => {
    var db = firebase_admin_1.default.firestore();
    var oauth2Client = new googleapis_1.default.Auth.OAuth2Client(Object.assign(Object.assign({}, googleapis_crediential), { redirectUri: "" }));
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
    firebase_admin_1.default;
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
