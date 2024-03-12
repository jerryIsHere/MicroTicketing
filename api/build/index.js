"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = (0, express_1.default)();
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
};
api.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
api.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default api;