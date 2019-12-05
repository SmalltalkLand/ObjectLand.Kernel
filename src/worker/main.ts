export default function sw_main(self: any){
    let settingsStream= new WritableStream({write: async function(t){


    }});
self.addEventListener('fetch',function(evt: any){
    let url = evt.request.url as String;
    if(url.startsWith('https://olSettings.')){evt.request.body.pipeTo(settingsStream); evt.respondWith(new Response('Settings Updated'))};
evt.respondWith(fetch(evt.request));

})

}