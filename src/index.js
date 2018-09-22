import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import grey from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'
import lime from '@material-ui/core/colors/lime'

import fake from 'components/fake'

const getPageRows = () => {
    return fake
}

const save = rows => {
    console.log('SAVE', rows)
}

const orangeNightTheme =  createMuiTheme({
    palette: {
        primary:   {main: orange[500]},
        secondary: {main: orange[300]},
        background:       grey[700],
        contrast:         grey[100],
    },
})

const whiteGreenTheme = createMuiTheme({
    palette: {
        primary:   {main: lime[500]},
        secondary: {main: lime[300]},
        background:       grey[50],
        contrast:         grey[700],
    },
})

window.theme = whiteGreenTheme

ReactDOM.render(
    <App 
        saveHandler={save}
        menu={true}
        getPageRows={getPageRows}
    />, 
    document.getElementById('root')
)