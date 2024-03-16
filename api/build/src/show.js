"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const googleapis_1 = require("googleapis");
var show;
(function (show) {
    function get(id) {
        var auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.replace(/\\n/g, '\n') : undefined
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
        const service = googleapis_1.google.sheets({ version: 'v4', auth });
        return service.spreadsheets.values.get({
            spreadsheetId: id,
            // range: "booklist!B2:B3",
        });
    }
    show.get = get;
    function list() {
        var auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_id: process.env.showmanager_client_id,
                client_email: process.env.showmanager_client_email,
                project_id: process.env.showmanager_project_id,
                private_key: process.env.showmanager_private_key ? process.env.showmanager_private_key.replace(/\\n/g, '\n') : undefined
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
