function sock(s: string){return new WebSocket(s)};
function readStream(s: WebSocket){return new ReadableStream({start: c => s.addEventListener('message',c.enqueue.bind(c))})};
function writeStream(s: WebSocket){return new WritableStream({write: s.send.bind(s)})};