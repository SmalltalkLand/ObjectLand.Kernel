import * as  _ from 'lodash-es'
export function vue(theVue: any,func: Function){return {render: func}}
export function react(theReact: any,func: Function){return theReact.createClass({render: _.partial(func as any,theReact.createElement)})}