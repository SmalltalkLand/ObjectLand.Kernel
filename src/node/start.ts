import {common,isMain} from './common'
var express = require('express');
var ecstatic = require('ecstatic');
var cors = require("cors");
var app: any = express();
var http = require('http');
var fs = require('fs');
var WebSocket = require('ws');
const session = require('express-session');
var replace = require('stream-replace');
let io: any;
let wss = new WebSocket.Server({noServer: true});
let procMap = new Map();
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
  });
  let aidMap = new Map();
  let procID = 0;
wss.on('connection',(ws: any,request: any) => {
let aid = request.session.aid;
let myProcID = procID++;
let onIOConnection: any;
procMap.set(myProcID,(req: any,res: any,e: any) => {
ws.on('message',function onMessage(data: any){
    let jdat = {} as any;
    try{
jdat = JSON.parse(data);
    }catch(err){return;};
if(jdat.type === 'exposeText')res.write(jdat.data);
if(jdat.type === 'exposeEnd'){res.end(); ws.off('message',onMessage)}
});

});
if(aid)aidMap.set(aid,ws);
if(io)io.on('connection',onIOConnection = (socket: any) => {


});
let h;
ws.on('close',() => {
if(aid)aidMap.delete(aid);
if(io)io.off('connection',onIOConnection);
procMap.delete(myProcID);
})

});
let s;
app.use(cors());
app.use('static/',ecstatic({root: `${__dirname}/`,handleError: false}));
app.use('wikipedia/',(req: any,res: any) => http.get('en.wikipedia.org' + new URL(req.url).pathname,(http: any) => req.pipe(http).pipe(res)));
app.get('app/:aid/index.js',async (req: any,res: any) => {
    let s = fs.createReadStream(`${__dirname}/aapi.js`);
    s.pipe(replace('TOKEN',req.params.token)).pipe(res,{end: false});
    await new Promise(s.on.bind(s,'end'));
    s = fs.createReadStream(`${__dirname}/chrome-fill.js`);
s.pipe(res,{end: false});
await new Promise(s.on.bind(s,'end'));
s = fs.createReadStream(`${__dirname}/main.js`);
s.pipe(res,{end: false});
await new Promise(s.on.bind(s,'end'));

});
app.get('proc/:p/:e',(req: { params: any },res: any) => {
procMap.get(req.params.p)(req,res,req.params.e);

});
(s = http.createServer(app));
try{io = require('socket.io')(http);}catch(err){};
s.on('upgrade',function onUpgrade(req: any,socket: any,head: any){
let u = new URL(req.url);
sessionParser(req,{},() => {
if(u.pathname === '/ws'){
    wss.handleUpgrade(req, socket, head, function done(ws: any) {
        wss.emit('connection', ws, req);
      });

}
});
});
s.listen(8080);