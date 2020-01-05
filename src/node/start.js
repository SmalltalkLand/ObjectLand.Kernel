var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var ecstatic = express.static;
var app = express();
var http = require('http');
var fs = require('fs');
var WebSocket2 = require('ws');
var session = require('express-session');
var replace = require('stream-replace');
var io;
var wss = new (WebSocket2.Server)({ noServer: true });
var procMap = new Map();
var sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});
var aidMap = new Map();
var procID = 0;
wss.on('connection', function (ws, request) {
    var aid = request.session.aid;
    var myProcID = procID++;
    var onIOConnection;
    procMap.set(myProcID, function (req, res, e) {
        ws.on('message', function onMessage(data) {
            var jdat = {};
            try {
                jdat = JSON.parse(data);
            }
            catch (err) {
                return;
            }
            ;
            if (jdat.type === 'exposeText')
                res.write(jdat.data);
            if (jdat.type === 'exposeEnd') {
                res.end();
                ws.off('message', onMessage);
            }
        });
    });
    if (aid)
        aidMap.set(aid, ws);
    if (io)
        io.on('connection', onIOConnection = function (socket) {
        });
    var h;
    ws.on('close', function () {
        if (aid)
            aidMap["delete"](aid);
        if (io)
            io.off('connection', onIOConnection);
        procMap["delete"](myProcID);
    });
});
var s;
app.use('/static/', function (req, res, next) { res.setHeader('Access-Control-Allow-Origin', '*'); return next(); }, ecstatic(__dirname + "/../../dist"));
app.use('/wikipedia/', function (req, res) { return http.get('en.wikipedia.org' + new URL(req.url).pathname, function (http) { return req.pipe(http).pipe(res); }); });
app.get('/app/:aid/index.js', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                s = fs.createReadStream(__dirname + "/aapi.js");
                s.pipe(replace('TOKEN', req.params.token)).pipe(res, { end: false });
                return [4 /*yield*/, new Promise(s.on.bind(s, 'end'))];
            case 1:
                _a.sent();
                s = fs.createReadStream(__dirname + "/chrome-fill.js");
                s.pipe(res, { end: false });
                return [4 /*yield*/, new Promise(s.on.bind(s, 'end'))];
            case 2:
                _a.sent();
                s = fs.createReadStream(__dirname + "/main.js");
                s.pipe(res, { end: false });
                return [4 /*yield*/, new Promise(s.on.bind(s, 'end'))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('proc/:p/:e', function (req, res) {
    procMap.get(req.params.p)(req, res, req.params.e);
});
(s = http.createServer(app));
s.on('upgrade', function onUpgrade(req, socket, head) {
    var u = new URL(req.url);
    sessionParser(req, {}, function () {
        if (u.pathname === '/ws') {
            wss.handleUpgrade(req, socket, head, function done(ws) {
                wss.emit('connection', ws, req);
            });
        }
    });
});
s.listen(8080);
