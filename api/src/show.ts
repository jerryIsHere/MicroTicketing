import express, { Express, Request, Response, Router } from "express";
import { sheets_v4, google, drive_v3 } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { sheets } from "googleapis/build/src/apis/sheets";

export namespace show {
    export function get(id: string): GaxiosPromise<sheets_v4.Schema$ValueRange> {
        var auth = new google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })
        const service = google.sheets({ version: 'v4', auth });
        return service.spreadsheets.values.get({
            spreadsheetId: id,
            // range: "booklist!B2:B3",
        })

    }
    export function list(): Promise<drive_v3.Schema$File[]> {
        var auth = new google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_ke
            },
            scopes: ['https://www.googleapis.com/auth/drive']
        })
        const service = google.drive({ version: 'v3', auth });
        return service.files.list({
            supportsAllDrives: true

        }).then((result: GaxiosResponse<drive_v3.Schema$FileList>) => {
            if (result.data.files) {
                return result.data.files.filter((f: drive_v3.Schema$File) => f.mimeType == "application/vnd.google-apps.spreadsheet")
            }
            else {
                throw new Error('Now Show Avaliable');
            }
        })
    }
}

