import express, { Express, Request, Response, Router } from "express";
import { sheets_v4, google } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { sheets } from "googleapis/build/src/apis/sheets";

export namespace show {

    export function create(): GaxiosPromise {
        var auth = new google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.replace(/\\n/g, '\n') : undefined
            },
            scopes: ['https://www.googleapis.com/auth/drive.file']
        })
        const service = google.sheets({ version: 'v4', auth });
        return service.spreadsheets.values.get({
            spreadsheetId: "1_oATschOmqj7VGrqj4zYLnaGEfUR0KEFrHiV60gbyQM",
            range: "B2:B3",
        })
        
        // res.send("firebase collections: " + db.listCollections())

    }
}