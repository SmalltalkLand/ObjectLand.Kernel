

export default function Console(setEnquer: Function,getCurrent: Function): Array<ReadableStream | WritableStream>{
return [new ReadableStream({start: (c) => setEnquer(c.enqueue.bind(c))}),new WritableStream({write: (v) => getCurrent().write(v)})]

}