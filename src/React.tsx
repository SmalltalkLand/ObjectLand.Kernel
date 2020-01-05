import OLTopbar from './OLTopbar'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
export default () => new Promise(c => ReactDOM.render(<OLTopbar ref = {c}></OLTopbar>,document.createElement('span')));