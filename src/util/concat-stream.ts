export default function concatStream(streams: Array<ReadableStream>): ReadableStream{
let readers = streams.map(s => s.getReader());

return new ReadableStream({
 async start(controller: any){
     for(let reader of readers){
let done = false;
while(!done){
let read = await reader.read();
done = read.done;
if(!done)controller.enqueue(read.value);
}
     }
     controller.close()
}

})

}