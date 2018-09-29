import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
    object,
    bool,
    number,
    func
} from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import grey from '@material-ui/core/colors/grey'

import Tools from './Tools'
import TooltipButton from './TooltipButton'

class AppendRow extends React.Component {
    static propTypes = {
        classes:          object.isRequired,
        isShowTools:      bool.isRequired,
        id:               number.isRequired,
        addRowHandler:    func.isRequired,
        showToolsHandler: func.isRequired,
    }

    state = {
        isShowTools: false,
    }

    isShowTools = () => {
        this.setState({isShowTools: true}, () => {
            this.props.showToolsHandler(true)
        })
    }

    hideTools = () => {
        this.setState({isShowTools: false}, () => {
            this.props.showToolsHandler(false)
        })
    }

    selectRowHandler = ({type, id}) => {
        this.setState({isShowTools: false}, () => {
            this.props.addRowHandler({type, id})
        })
    }

    render() {
        const {
            classes,
            isShowTools: isShowToolsProps,
            id,
        } = this.props
        const {isShowTools: isShowToolsState} = this.state

        if(isShowToolsState){
            return (
                <div className={classes.root}>
                    <div className={classes.tools}>
                        <Tools selectRowHandler={val => this.selectRowHandler({type: val, id: id})}/>
                    </div>
                    <Tooltip title='Отменить'>
                        <IconButton
                            className={classes.icon}
                            style={{margin: '-19px auto 0px auto'}}
                            onClick={this.hideTools}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                        <TooltipButton
                            tooltip='Добавить линию'
                            className={classes.icon}
                            clickHandler={this.isShowTools}
                            disabled={isShowToolsProps}
                        >
                            <AddIcon/>
                        </TooltipButton>
                </div>
            )
        }
    }
}

const delay = 300
const styles = () => ({
    root: {
        zIndex: 1000,
        margin: '-20px auto',
    },
    icon: {
        width: 36,
        height: 36,
        margin: '0 auto',
        marginBottom: '0px',
        display: 'block',
        backgroundColor: window.theme.palette.primary.main,
        color: window.theme.palette.background,
        transition: '0.9s',
        boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 4px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        '&:hover': {
            backgroundColor: window.theme.palette.secondary.main,
            transition: `background-color ${delay}ms`,
        },
        '&:disabled': {
            backgroundColor: '#ffffff00',
            color: '#ffffff00',
        }
    },
    tools: {
        width: '100%',
        transition: '0.3s',
    },
    divider: {
        margin: '30px auto 8px auto',
        backgroundColor: grey[400]
    }
})

export default withStyles(styles)(AppendRow)