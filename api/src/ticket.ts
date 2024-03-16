import express, { Express, Request, Response, Router } from "express";
import { sheets_v4, google, drive_v3 } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from 'gaxios';
import { sheets } from "googleapis/build/src/apis/sheets";

export namespace ticket {
    export async function get(showId: string, seatId: string, contactname: string): Promise<any> {
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
        var seatsInfo = (await service.spreadsheets.values.get({
            spreadsheetId: showId,
            range: 'microticketing-seats'
        })).data
        var avaliableSeatIds = seatsInfo.values?.filter(row => row.length < 2 || row[1] == "" || row[1] == undefined).map(row => row[0])
        if (Array.isArray(avaliableSeatIds) && avaliableSeatIds.includes(seatId)) {
            var sheet: string | undefined = seatsInfo.range?.split("!")[0]
            var startRowMatch: RegExpMatchArray | undefined | null = seatsInfo.range?.split("!")[1].split(":")[0].match(/\d+/)
            var row: number | undefined = seatsInfo.values?.map(row => row[0]).findIndex(value => value == seatId);
            if (sheet && startRowMatch && row && startRowMatch["input"] && startRowMatch["0"]) {
                let targetcoor = Number(startRowMatch["0"]) + row
                var range = sheet + '!' + 'B' + targetcoor
                if (range) {
                    return new Promise((resolve, reject) => {
                        service.spreadsheets.values.update({
                            spreadsheetId: showId,
                            range: range,
                            valueInputOption: "RAW",
                            requestBody: {
                                "range": range,
                                "majorDimension": "ROWS",
                                "values": [
                                    [contactname]
                                ]

                            }
                        }).then((result) => {
                            resolve({
                                success: false,
                                message: "seat not avaliable"
                            })
                        }).catch((reason) => {
                            reject({
                                success: false,
                                message: "reason"
                            })
                        })
                    })

                }
            }
        }
        return {
            success: false,
            message: "seat not avaliable"
        }
    }
}

