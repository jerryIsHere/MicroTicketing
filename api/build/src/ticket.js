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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticket = void 0;
const googleapis_1 = require("googleapis");
var ticket;
(function (ticket) {
    function get(showId, seatId, contactname) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            var auth = new googleapis_1.google.auth.GoogleAuth({
                credentials: {
                    client_id: process.env.showmanager_client_id,
                    client_email: process.env.showmanager_client_email,
                    project_id: process.env.showmanager_project_id,
                    private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.split(String.raw `\n`).join('\n') : undefined
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            });
            const service = googleapis_1.google.sheets({ version: 'v4', auth });
            var seatsInfo = (yield service.spreadsheets.values.get({
                spreadsheetId: showId,
                range: 'microticketing-seats'
            })).data;
            var avaliableSeatIds = (_a = seatsInfo.values) === null || _a === void 0 ? void 0 : _a.filter(row => row.length < 2 || row[1] == "" || row[1] == undefined).map(row => row[0]);
            if (Array.isArray(avaliableSeatIds) && avaliableSeatIds.includes(seatId)) {
                var sheet = (_b = seatsInfo.range) === null || _b === void 0 ? void 0 : _b.split("!")[0];
                var startRowMatch = (_c = seatsInfo.range) === null || _c === void 0 ? void 0 : _c.split("!")[1].split(":")[0].match(/\d+/);
                var row = (_d = seatsInfo.values) === null || _d === void 0 ? void 0 : _d.map(row => row[0]).findIndex(value => value == seatId);
                if (sheet && startRowMatch && row && startRowMatch["input"] && startRowMatch["0"]) {
                    let targetcoor = Number(startRowMatch["0"]) + row;
                    var range = sheet + '!' + 'B' + targetcoor;
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
                                });
                            }).catch((reason) => {
                                reject({
                                    success: false,
                                    message: "reason"
                                });
                            });
                        });
                    }
                }
            }
            return {
                success: false,
                message: "seat not avaliable"
            };
        });
    }
    ticket.get = get;
})(ticket = exports.ticket || (exports.ticket = {}));
