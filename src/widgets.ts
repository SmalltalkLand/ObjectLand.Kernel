export async function addWidget(source: any,domain: string,html: string): Promise<void>{
    let wid = 'widget-' + domain;
let already = await source.get([wid]);
await source.set({[wid]: already.concat([{html,id: Math.random()}])});

}
export async function changeWidget(source: any,domain: string,id: number,reducer: (v: string) => Promise<string>): Promise<void>{
    let wid = 'widget-' + domain;
    let already = await source.get([wid]);
await source.set({[wid]: already.map((v: any) => {
if(v.id !== id)return v;
return {html: reducer(v.html),id: v.id}

})})
}
export async function getAll(source: any,domain: string): Promise<Array<any>>{
return await source.get(['widget-' + domain])

}