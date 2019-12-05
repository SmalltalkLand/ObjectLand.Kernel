export default async function breek_init(proxy: any,opts: any): Promise<any>{
let smalltalk = await (await proxy.call('at:','Smalltalk')).call('top');
await smalltalk.call('when:send:to:','jsInit','call:with:', async function(js: any) {
await js.call('default:',await js.call('native'));

});
await smalltalk.call('whenUAC:',async function(uac: any){
return await opts.uac(await uac.mesageResults('unary',{without: ['continue']}),function(){return uac.call('continue')})

});

}