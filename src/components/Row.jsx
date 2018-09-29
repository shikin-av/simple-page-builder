import React from 'react'
import {
    string,
    number,
    func,
    node,
    object,
} from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ColorIcon from '@material-ui/icons/ColorLens'
import UpIcon from '@material-ui/icons/ArrowUpward'
import DownIcon from '@material-ui/icons/ArrowDownward'

import DeleteDialog from './dialogs/Delete'
import ColorDialog from './dialogs/SelectColor'
import DividerGorizontal from './DividerGorizontal'
import colors from '../colors'

class Row extends React.Component {
    static propTypes = {
        classes:           object.isRequired,
        mode:              string.isRequired,
        id:                number.isRequired,
        children:          node.isRequired,
        color:             string,
        position:          string,
        rowsCount:         number,
        showToolsHandler:  func.isRequired,
        addHandler:        func.isRequired,
        deleteHandler:     func.isRequired,
        moveHandler:       func.isRequired,
    }

    state = {
        mode: 'load',
        anchorEl: null,
        showDeleteDialog: false,
        showColorDialog: false,
    }

    componentDidMount() {
        const {mode} = this.props
        this.setState({mode: mode})
    }

    componentWillReceiveProps(nextProps) {
        const oldMode = this.props.mode
        const newMode = nextProps.mode

        if (newMode !== oldMode) {
            this.setState({mode: newMode})
        }
    }

    openMenu = e => {
        this.setState({anchorEl: e.currentTarget})
    }

    closeMenu = () => {
        this.setState({anchorEl: null})
    }

    menu = () => {
        const {
            classes,
            position,
            rowsCount,
        } = this.props
        const {
            anchorEl,
            showDeleteDialog,
            showColorDialog,
        } = this.state
        return (
            <div className={classes.menuButtonPlace}>
                <Tooltip title='Меню линии'>
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
                        onClick={this.openColorDialog}
                    >
                        <ColorIcon/>Цвет фона
                    </MenuItem>
                    {
                        position !== 'first' && rowsCount > 1 &&
                        <MenuItem
                            onClick={() => this.move('up')}
                        >
                            <UpIcon/>Переместить вверх
                        </MenuItem>
                    }
                    {
                        position !== 'last' && rowsCount > 1 &&
                        <MenuItem
                            onClick={() => this.move('down')}
                        >
                            <DownIcon/>Переместить вниз
                        </MenuItem>
                    }

                    <MenuItem
                        onClick={this.openDeleteDialog}
                    >
                        <DeleteIcon/>Удалить линию
                    </MenuItem>
                </Menu>
                <DeleteDialog
                    title='Удалить линию?'
                    showDialog={showDeleteDialog}
                    acceptHandler={this.deleteHandler}
                    cancelHandler={() => this.setState({
                        showDeleteDialog: false,
                        anchorEl:         null,
                    })}
                />
                <ColorDialog
                    title='Выберите цвет фона'
                    showDialog={showColorDialog}
                    acceptHandler={this.selectColorHandler}
                    cancelHandler={() => this.setState({
                        showColorDialog: false,
                        anchorEl:         null,
                    })}
                    colors={colors}
                />
            </div>
        )
    }

    openDeleteDialog = () => {
        this.setState({
            showDeleteDialog: true,
            anchorEl:         null,
        })
    }

    deleteHandler = () => {
        const {id, deleteHandler} = this.props
        deleteHandler(id)
    }

    openColorDialog = () => {
        this.setState({
            showColorDialog: true,
            anchorEl:         null,
        })
    }

    selectColorHandler = color => {
        const {id, selectColorHandler} = this.props
        this.setState({showColorDialog: false}, () => {
            selectColorHandler({id, color})
        })
    }

    move = direction => {
        const {id, moveHandler} = this.props
        this.setState({
            showDeleteDialog: false,
            anchorEl:         null,
        }, () => {
            moveHandler({id, direction})
        })
    }

    render() {
        const {mode} = this.state
        const {
            children,
            classes,
            color,
        } = this.props

        if(mode === 'load'){
            return (
                <div>
                    ShadowComponent
                </div>
            )
        } else {
            const style = {}
            if(color){
                style.backgroundColor = color
            }

            return (
                <div>
                    {mode === 'edit' && this.menu()}
                    <div
                        className={classes.root}
                        style={style}
                    >
                        {children}
                    </div>
                    <DividerGorizontal mode={mode}/>
                </div>
            )
        }
    }
}

const styles = () => ({
    root: {
        minHeight: 70,
        padding: '29px 20px',
    },
    menuButtonPlace: {
        width: 0,
        height: 0,
        right: 0,
        position: 'absolute',
    },
    menuButton: {
        top: 1,
        position: 'absolute',
        borderRadius: 0,
        zIndex: 1000,
        width: 35,
        height: 36,
        right: 0,
        color: window.theme.palette.menuText,
    },
})

export default withStyles(styles)(Row)
