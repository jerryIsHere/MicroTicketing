"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleapis_1 = require("googleapis");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const api = (0, express_1.default)();
var corsOptions = {
    origin: 'https://micro-ticketing.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
api.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT || 3000;
var googleapis_crediential = {
    clientId: process.env.googleapis_web_client_id,
    clientSecret: process.env.googleapis_web_client_secret
};
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        privateKey: process.env.firebase_private_key ? process.env.firebase_private_key.replace(/\\n/g, '\n') : undefined,
        clientEmail: process.env.firebase_client_email,
        projectId: process.env.firebase_project_id
    })
});
api.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var db = firebase_admin_1.default.firestore();
    var auth = new googleapis_1.google.auth.GoogleAuth({
        credentials: {
            client_id: process.env.showmanager_client_id,
            client_email: process.env.showmanager_client_email,
            project_id: process.env.showmanager_project_id,
            private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.replace(/\\n/g, '\n') : undefined
        },
        scopes: ['https://www.googleapis.com/auth/drive.file']
    });
    const service = googleapis_1.google.sheets({ version: 'v4', auth });
    service.spreadsheets.values.get({
        spreadsheetId: "1_oATschOmqj7VGrqj4zYLnaGEfUR0KEFrHiV60gbyQM",
        range: "B2:B3",
    }).then((result) => {
        res.send(result.data.values);
    }).catch((reason) => {
        res.send(reason);
    });
    // res.send("firebase collections: " + db.listCollections())
}));
api.listen(port, () => {
    firebase_admin_1.default;
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
