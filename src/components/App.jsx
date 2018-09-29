import React from 'react'
import 'typeface-roboto'
import _ from 'lodash'
import {object, func, bool, string} from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import ViewIcon from '@material-ui/icons/Pageview'
import SaveIcon from '@material-ui/icons/Save'
import grey from '@material-ui/core/colors/grey'

import Row from './Row'
import rowTypes from './rows'
import AppendRow from './AppendRow'
import DividerGorizontal from './DividerGorizontal'

const defaultTheme = createMuiTheme({
    palette: {
        primary:   {main: grey[500]},
        secondary: {main: grey[300]},
        background:       grey[50],
        contrast:         grey[700],
        menuBackground:   grey[100],
        menuText:         grey[700]
    },
})

class App extends React.Component {
    static propTypes = {
        saveHandler: func.isRequired,
        classes:     object.isRequired,
        menu:        bool.isRequired,
        mode:        string,
        getPageRows: func,
    }

    state = {
        mode:        this.props.mode || 'preview',
        isShowTools: false,
        rows:        this.props.getPageRows() || []
    }

    tmpRows = this.state.rows   
    
    componentWillMount = () => {
        if(!window.theme){
            window.theme = defaultTheme
        } else {
            window.theme = Object.assign(defaultTheme, window.theme)    
        }
        document.body.style.backgroundColor = window.theme.palette.background
    }

    showToolsHandler = val => {
        this.setState({isShowTools: val})
    }

    addRow = ({type, id}) => {
        const {rows} = this.state
        const prevRowId = id
        
        const prevRowIndex = _.findIndex(rows, row => {
            return row.id === prevRowId
        })
        
        const prevRows = _.take(rows, prevRowIndex + 1)                
        const nextRows = _.difference(rows, prevRows)
        prevRows.push({
            id: Math.random(),
            type: type,
            elements: []
        })
        const resultRows = _.concat(prevRows, nextRows) 
        this.tmpRows = resultRows
        this.setState({
            isShowTools: false,
            rows: resultRows,
        })
        
    }

    deleteRow = id => {
        const {rows} = this.state
        const newRows = _.reject(rows, {id: id})
        this.tmpRows = newRows
        this.setState({rows: newRows})
    }

    addElement = ({element, row, rowPlace}) => {
        const {rows} = this.state    
        const currentRowIndex = _.findIndex(rows, item => {
            return item.id === row.id
        })        
        
        const rowElement = {}
        rowElement.id = Math.random()
        rowElement.type = element.type

        rows[currentRowIndex].elements[rowPlace] = rowElement
        
        this.tmpRows = rows
        this.setState({rows})
    }

    deleteElement = ({element, row, rowPlace}) => {
        const {rows} = this.state
        const currentRowIndex = _.findIndex(rows, item => {
            return item.id === row.id
        })        
        rows[currentRowIndex].elements[rowPlace] = null
        this.tmpRows = rows
        this.setState({rows})
    }

    selectRowColor = ({id, color}) => {
        const {rows} = this.state
        const rowIndex = _.findIndex(rows, row => {
            return row.id === id
        })
        if(rowIndex !== -1){
            rows[rowIndex].color = color
            this.tmpRows = rows
            this.setState({rows})
        } 
    }

    moveRowHandler = ({id, direction}) => {
        const {rows} = this.state
        const currentRowIndex = _.findIndex(rows, item => {
            return item.id === id
        })
        let neighborRowIndex = null
        if(direction === 'up'){
            neighborRowIndex = currentRowIndex - 1
        } else if(direction === 'down'){
            neighborRowIndex = currentRowIndex + 1
        }
        const currentRow =  rows[currentRowIndex]
        const neighborRow = rows[neighborRowIndex]
        rows[currentRowIndex] = neighborRow
        rows[neighborRowIndex] = currentRow
        this.tmpRows = rows
        this.setState({rows})
    }

    changeElementContent = ({row, rowPlace, element, content}) => {        
        const {rows} = this.state
        let rowIndex = 0
        if(rows.length){
            rowIndex = _.findIndex(rows, item => {
                return item.id === row.id
            })            
        }        
        this.tmpRows[rowIndex].elements[rowPlace].content = content        
    }

    changeMode = mode => {
        this.setState({
            mode,
            rows: this.tmpRows
        })
    }

    save = () => {
        const {saveHandler} = this.props
        saveHandler(this.tmpRows)
    }

    appendRowFake = () => (
        <div style={{
            height: 36,
            margin: -20,
            width: '100%',
        }}></div>
    )

    menu = () => {
        const {classes, menu} = this.props
        const {mode} = this.state        
        if(menu){
            return (
                <div className={classes.menu}>
                    <Tooltip title='Сохранить страницу'>
                        <Button                                
                            onClick={this.save}
                            className={classes.menuButton}                            
                        >
                            <SaveIcon/>Сохранить
                        </Button>   
                    </Tooltip>
                    {
                        mode === 'edit' &&
                        <Tooltip title='Предпросмотр страницы'>
                            <Button
                                onClick={() => this.changeMode('preview')}
                                className={classes.menuButton}
                            >
                                <ViewIcon/>Предпросмотр
                            </Button>
                        </Tooltip>
                    }
                    {
                        mode === 'preview' &&
                        <Tooltip title='Редактирование страницы'>
                            <Button
                                onClick={() => this.changeMode('edit')}
                                className={classes.menuButton}
                            >
                                <ViewIcon/>Редактор
                            </Button>
                        </Tooltip>
                    }                        
                </div>
            )
        } else return null
        
    }
    
    render() {
        const {classes} = this.props
        const {
            mode, 
            rows, 
            isShowTools
        } = this.state
        
        return (
            <MuiThemeProvider theme={window.theme}>
                <CssBaseline/>
                <div className={classes.root}>                    
                    {this.menu()}
                    {
                        mode === 'edit' &&
                        <AppendRow 
                            showToolsHandler={this.showToolsHandler}
                            isShowTools={isShowTools}
                            addRowHandler={this.addRow}
                            id={Math.random()}
                        />
                    }
                    {mode === 'preview' && this.appendRowFake()}

                    <DividerGorizontal mode={mode}/>                    

                    <ReactCSSTransitionGroup 
                        transitionName='animTranslateY'                        
                        transitionAppear={true}
                        transitionAppearTimeout={900}
                        transitionEnter={true}
                        transitionEnterTimeout={900}
                        transitionLeave={true}
                        transitionLeaveTimeout={900}
                    >                        
                        {                            
                            rows.map((row, i) => {
                                let RowView = rowTypes[_.findIndex(rowTypes, rowType => {return rowType.type === row.type})]
                                switch(mode) {
                                    case 'edit':
                                        RowView = RowView.edit
                                        break
                                    case 'preview':
                                        RowView = RowView.preview
                                        break
                                }
                                let position = 'middle'
                                if(i === 0){
                                    position = 'first'
                                } else if(i === rows.length - 1){
                                    position = 'last'
                                }
                                
                                return (
                                    <div key={row.id}>
                                        <Row 
                                            mode={mode}                                            
                                            id={row.id}
                                            color={row.color || null}
                                            showToolsHandler={this.showToolsHandler}                                            
                                            addHandler={this.addRow}
                                            deleteHandler={this.deleteRow}
                                            selectColorHandler={this.selectRowColor}
                                            moveHandler={this.moveRowHandler}
                                            position={position}
                                            rowsCount={rows.length}
                                        >
                                            <RowView 
                                                elements={row.elements} 
                                                row={row}
                                                deleteElementHandler={this.deleteElement}
                                                addElementHandler={this.addElement}
                                                moveHandler={this.moveHandler}
                                                changeContentHandler={this.changeElementContent}
                                            />
                                        </Row>                                        
                                        {
                                            mode === 'edit' &&
                                            <AppendRow 
                                                showToolsHandler={this.showToolsHandler}
                                                isShowTools={isShowTools}
                                                addRowHandler={this.addRow}
                                                id={row.id}
                                            />
                                        }
                                        {mode === 'preview' && this.appendRowFake()}
                                    </div>
                                )
                            })
                        }
                    </ReactCSSTransitionGroup>
                </div>
            </MuiThemeProvider>
        )        
    }
}

const styles = () => ({
    root: {        
        backgroundColor: window.theme.palette.background,
        color: `${window.theme.palette.contrast} !important`,
        top: 0,
        left: 0,
        width: '100%',        
    },
    menu: {
        textAlign: 'center',
        marginBottom: 30,
        paddingTop: 10,
    },
    menuButton: {
        color: `${window.theme.palette.contrast} !important`,

        '&:hover': {
            color: `${window.theme.palette.primary.main} !important`,
        }
    }
})

export default withStyles(styles)(App)