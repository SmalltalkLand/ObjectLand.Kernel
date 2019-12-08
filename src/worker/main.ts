import pipe from '../util/pipe'

export default function sw_main(self: any,server: any): Promise<Request| undefined>{
    return new Promise(c => {
let settingsPipe = pipe();
if(!server)return c();
server.get(self.location + '/settings/api/set',function(req: any,response: Response | null){
req.body.pipeTo(settingsPipe[1]);

});
server.get(self.location + '/settings/api/stream',function(req: any,response: Response | null){
return new Response(settingsPipe[0]);

})
server.get(self.location + '/init',function(req: any,response: Response | null){c(req)});
})
}