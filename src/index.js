import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'

const save = rows => {
    console.log('SAVE', rows)
}

ReactDOM.render(<App saveHandler={save}/>, document.getElementById('root'))