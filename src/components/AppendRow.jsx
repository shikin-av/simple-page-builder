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

class AppendRow extends React.Component {
    static propTypes = {
        classes:          object.isRequired,
        isShowTools:      bool.isRequired,
        id:               number.isRequired,
        addRowHandler:    func.isRequired,
        showToolsHandler: func.isRequired,
        theme:            object.isRequired,
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
            theme,
        } = this.props
        const {isShowTools: isShowToolsState} = this.state

        if(isShowToolsState){
            return (
                <div className={classes.root}>
                    <div className={classes.tools}>
                        <Tools 
                            selectRowHandler={val => this.selectRowHandler({type: val, id: id})}
                            theme={theme}
                        />
                    </div>
                    <Tooltip title='Отменить'>
                        <IconButton
                            className={classes.icon}
                            style={{
                                margin: '-19px auto 0px auto',
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background,
                            }}
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
                    <Tooltip title='Добавить линию'>
                        <IconButton
                            className={classes.icon}
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background,
                            }}
                            onClick={this.isShowTools}
                            disabled={isShowToolsProps}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
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
        transition: '0.9s',
        boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 4px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        '&:hover': {
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


