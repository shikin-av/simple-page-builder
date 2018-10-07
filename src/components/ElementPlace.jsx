import React from 'react'
import _ from 'lodash'
import {object, func, number} from 'prop-types'
import ReactDOM from 'react-dom'

import elements from './elements'
import DeleteDialog from './dialogs/Delete'

import AddIcon from '@material-ui/icons/Add'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import grey from '@material-ui/core/colors/grey'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'

class ElementPlace extends React.Component {
    static propTypes = {
        element:              object,
        row:                  object.isRequired,
        deleteElementHandler: func.isRequired,
        addElementHandler:    func.isRequired,
        rowPlace:             number.isRequired,
        changeContentHandler: func.isRequired,
        theme:                object.isRequired,
    }

    state = {
        element:      null,
        showElements: false,
        mouseEnter:   false,
        anchorEl:     null,
        showDeleteDialog: false,
    }

    componentWillMount = () => {
        const {element} = this.props
        if(element){
            this.setState({
                element: elements[_.findIndex(elements, el => {return el.type === element.type})]
            })
        }
    }

    addElement = element => {
        const {
            row,
            rowPlace,
            addElementHandler,
        } = this.props

        this.setState({element}, () => {
            addElementHandler({
                element,
                row,
                rowPlace
            })
        })
    }

    deleteElement = element => {
        const {
            row,
            rowPlace,
            deleteElementHandler,
        } = this.props

        this.setState({
            element: null,
            showElements: false,
            showDeleteDialog: false,
        }, () => {
            deleteElementHandler({
                element,
                row,
                rowPlace
            })
        })
    }

    openMenu = e => {
        this.setState({anchorEl: e.currentTarget})
    }

    closeMenu = () => {
        this.setState({anchorEl: null})
    }

    menu = () => {
        const {classes} = this.props
        const {
            mouseEnter,
            anchorEl,
            showDeleteDialog,
            element: elementState,
        } = this.state
        if(mouseEnter){
            return (
                <div className={classes.menu}>
                    <Tooltip title='Меню элемента'>
                        <IconButton
                            onClick={this.openMenu}
                            className={classes.menuButton}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={this.closeMenu}
                    >
                        <MenuItem
                            onClick={this.openDeleteDialog}
                        >
                            <DeleteIcon/>Удалить элемент
                        </MenuItem>
                    </Menu>
                    <DeleteDialog
                        title='Удалить элемент?'
                        showDialog={showDeleteDialog}
                        acceptHandler={() => this.deleteElement(elementState)}
                        cancelHandler={() => this.setState({
                            showDeleteDialog: false,
                            anchorEl:         null,
                        })}
                    />
                </div>
            )
        } else return null
    }

    openDeleteDialog = () => {
        this.setState({
            showDeleteDialog: true,
            anchorEl:         null,
        })
    }

    render(){
        const {
            element: elementState,
            showElements,
            mouseEnter,
        } = this.state
        const {
            element: elementProps,
            theme,
        } = this.props
        const {
            classes,
            row,
            rowPlace,
        } = this.props

        if(elementState){
            return (
                <Grid item
                    className={classes.root}
                    onMouseEnter={() => this.setState({mouseEnter: true})}
                    onMouseLeave={() => this.setState({mouseEnter: false})}
                    style={mouseEnter ? {
                        outline: `1px dashed ${grey[600]}`,
                        backgroundColor: '#ffffff36',
                    } : null}
                >
                    {this.menu()}
                    <elementState.edit
                        element={elementProps || {}}
                        row={row}
                        changeContent={this.props.changeContentHandler}
                        rowPlace={rowPlace}
                        theme={theme}
                    />
                </Grid>
            )
        } else {
            if(showElements){
                return (
                    <Grid item className={classes.root}>
                        <div className={classes.elements}>
                            {
                                elements.map(element => {
                                    return (                                        
                                        <Tooltip title={element.tooltip} key={element.type}>
                                            <IconButton
                                                variant='outlined'
                                                className={classes.button}
                                                onClick={() => this.addElement(element)}
                                                style={{
                                                    color:           theme.palette.contrast,
                                                    backgroundColor: theme.palette.secondary.main,
                                                }}                
                                                ref={'elementBtn'}                            
                                                onMouseLeave={() => {
                                                    const el = ReactDOM.findDOMNode(this.refs.elementBtn)
                                                    el.style.color           = theme.palette.contrast
                                                    el.style.backgroundColor = theme.palette.secondary.main
                                                }}
                                                onMouseEnter={() => {
                                                    const el = ReactDOM.findDOMNode(this.refs.elementBtn)
                                                    el.style.color           = theme.palette.background
                                                    el.style.backgroundColor = theme.palette.contrast
                                                }}
                                            >
                                                <element.icon/>
                                            </IconButton>
                                        </Tooltip>
                                    )
                                })
                            }
                        </div>
                    </Grid>
                )
            } else {
                return (
                    <Grid item className={classes.root}>
                        <Tooltip title='Добавить элемент'>
                            <IconButton
                                variant='outlined'
                                className={classes.button}
                                onClick={() => this.setState({showElements: true})}
                                style={{
                                    color:           theme.palette.contrast,
                                    backgroundColor: theme.palette.secondary.main,
                                }}
                                ref={'addElementBtn'}                            
                                onMouseLeave={() => {
                                    const el = ReactDOM.findDOMNode(this.refs.addElementBtn)
                                    el.style.color           = theme.palette.contrast
                                    el.style.backgroundColor = theme.palette.secondary.main
                                }}
                                onMouseEnter={() => {
                                    const el = ReactDOM.findDOMNode(this.refs.addElementBtn)
                                    el.style.color           = theme.palette.background
                                    el.style.backgroundColor = theme.palette.contrast
                                }}
                            >
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )
            }
        }
    }
}

const styles = () => ({
    root: {
        minHeight: 50,
        height: '100%',
    },
    button: {
        display: 'block',
        margin: '0 auto',
        marginTop: 19,        
        borderRadius: 4,
        width: 36,
        height: 36,
        boxShadow: '0px -3px 10px -13px rgba(0, 0, 0, 0.2), 0px 3px 14px 2px rgba(0, 0, 0, 0.16)',
    },
    elements: {
        margin: '0 auto',
        display: 'table',
    },
    menu: {
        width: 0,
        height: 0,
        zIndex: 100,
        position: 'absolute',
    },
    menuButton: {
        width: 36,
        height: 36,
        right: 28,
        top: 3,
        borderRadius: 0,
    }
})

export default withStyles(styles)(ElementPlace)
