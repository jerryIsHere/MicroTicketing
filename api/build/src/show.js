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
exports.show = void 0;
const googleapis_1 = require("googleapis");
var show;
(function (show) {
    function get(id) {
        var _a, _b;
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
            var seatIds = (_a = (yield service.spreadsheets.values.get({
                spreadsheetId: id,
                range: 'microticketing-seats'
            })).data.values) === null || _a === void 0 ? void 0 : _a.filter(row => row.length < 2 || row[1] == "" || row[1] == undefined).map(row => row[0]);
            var info = (_b = (yield service.spreadsheets.values.get({
                spreadsheetId: id,
                range: 'microticketing-info'
            })).data.values) === null || _b === void 0 ? void 0 : _b.reduce((info, row, ind) => {
                info[row[0]] = row[1];
                return info;
            }, {});
            return {
                info: info,
                seats: seatIds
            };
        });
    }
    show.get = get;
    function list() {
        var auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.split(String.raw `\n`).join('\n') : undefined
            },
            scopes: ['https://www.googleapis.com/auth/drive']
        });
        const service = googleapis_1.google.drive({ version: 'v3', auth });
        return service.files.list({
            supportsAllDrives: true
        }).then((result) => {
            if (result.data.files) {
                return result.data.files.filter((f) => f.mimeType == "application/vnd.google-apps.spreadsheet");
            }
            else {
                throw new Error('Now Show Avaliable');
            }
        });
    }
    show.list = list;
})(show = exports.show || (exports.show = {}));
