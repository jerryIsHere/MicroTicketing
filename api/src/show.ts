import express, { Express, Request, Response, Router } from "express";
import { sheets_v4, google, drive_v3 } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { sheets } from "googleapis/build/src/apis/sheets";

export namespace show {
    export async function get(id: string): Promise<any> {
        var auth = new google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.split(String.raw`\n`).join('\n') : undefined
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })
        const service = google.sheets({ version: 'v4', auth });
        var seatIds = (await service.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'microticketing-seats'
        })).data.values?.filter(row => row.length < 2 || row[1] == "" || row[1] == undefined).map(row => row[0])
        var info = (await service.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'microticketing-info'
        })).data.values?.reduce((info: any, row, ind) => {
            info[row[0]] = row[1]
            return info;
        }, {})
        return {
            info: info,
            seats: seatIds
        }

    }
    export function list(): Promise<drive_v3.Schema$File[]> {
        var auth = new google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.split(String.raw`\n`).join('\n') : undefined
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

