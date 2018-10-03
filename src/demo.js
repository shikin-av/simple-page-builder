import React from 'react'
import ReactDOM from 'react-dom'
import SPB from './components/App'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import grey from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'
import lime from '@material-ui/core/colors/lime'
import Button from '@material-ui/core/Button'

import fakeData from './fakeData'

const getPageRows = () => {
    //return fakeData
    return []
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

class ChangeThemeApp extends React.Component {
    state = {
        theme: window.theme,
    }

    changeTheme = theme => {
        window.theme = theme
        this.setState({theme})
    }

    render(){
        const {theme} = this.state
        return (
            <div>
                <Button
                    onClick={() => this.changeTheme(orangeNightTheme)}
                    style={{
                        margin: '0 auto',
                        display: 'block',
                    }}
                >
                    Сменить тему
                </Button>
                <SPB 
                    saveHandler={save}
                    menu={true}
                    mode='edit'
                    getPageRows={getPageRows}
                    theme={theme}
                />
            </div>
        )
    }
}

const App = () => (
    <SPB 
        saveHandler={save}
        menu={true}
        mode='edit'
        getPageRows={getPageRows}
        theme={window.theme}
    />
)

ReactDOM.render(
    <App/>, 
    document.getElementById('root')
)