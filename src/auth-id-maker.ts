import * as  _ from 'lodash-es'
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default () => {return new Array(3).map(_.partial(getRandomInt,0x30a0,0x30ff)).map(String.fromCodePoint.bind(String)).join('')}