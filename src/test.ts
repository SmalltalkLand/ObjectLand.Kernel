import './index.ts'
function test(global: any){
let oldLog: { (message?: any, ...optionalParams: any[]): void; (message?: any, ...optionalParams: any[]): void; (message?: any, ...optionalParams: any[]): void; (message?: any, ...optionalParams: any[]): void; };
let oldRolly: any;
let oldWorker: any, oldSharedWorker: any;
let jest = global.jest;
global.beforeAll(() => {
console.log = jest.fn(oldLog = console.log);
global.chrome = {runtime: {sendMessage: jest.fn(),onMessage: jest.fn()}};
oldRolly = global.rolly;
global.rolly = {setState: jest.fn()};
global.Worker = jest.fn(oldWorker = global.Worker);
global.SharedWorker = jest.fn(oldSharedWorker = global.SharedWorker);
global.DialogBox = jest.fn();
})
global.afterAll(() => {
console.log = oldLog;
global.rolly = oldRolly;
global.Worker = oldWorker;
global.SharedWorker = oldSharedWorker;
})
global.test('creates a dialog the preferred way',() => {
let d: any = document.createElement('ol-dialog');
let expect = global.expect;
expect(d).toBeThruthy();
expect(d.dialog).toBeThruthy();
d.show();
expect(d.style.display).not.toBe('none');
d.hide();
expect(d.style.display).toBe('none');
})
};
try{test(global)}catch(err){};
export default test