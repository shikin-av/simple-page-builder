import React from 'react'
import {
    string, 
    func,
    bool,
    array,
} from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

class SelectColor extends React.Component {
    static propTypes = {
        title:         string.isRequired,
        showDialog:    bool.isRequired,
        acceptHandler: func.isRequired,
        cancelHandler: func.isRequired,
        colors:        array.isRequired,
        currentColor:  string,
    }

    state = {
        color: this.props.currentColor || null,
    }

    colorChange = (e, color) => {
        this.setState({color})        
    }

    render(){
        const {color: colorState} = this.state
        const {
            classes,
            title,
            showDialog,
            cancelHandler,
            colors,
            acceptHandler,
        } = this.props
        return (
            <Dialog
                    open={showDialog}
                    onClose={cancelHandler}
                    aria-labelledby='color-dialog-title'                    
                >
                    <div className={classes.root}>
                        <DialogTitle id='color-dialog-title'>{title}</DialogTitle>
                        <DialogContent>
                            <BottomNavigation
                                value={colorState}
                                onChange={this.colorChange}
                                className={classes.colorBlock}
                            >
                                {
                                    colors.map(color => (
                                        <BottomNavigationAction
                                            key={color}
                                            value={color}
                                            className={color === colorState ? classes.selected : classes.color}
                                            style={{backgroundColor: color}}
                                        />
                                    ))
                                }
                            </BottomNavigation>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={() => acceptHandler(colorState)} 
                                color='primary' 
                                autoFocus
                                disabled={!colorState}
                            >
                                Выбрать
                            </Button>
                            <Button 
                                onClick={cancelHandler}
                                color='primary'
                            >
                                Отмена
                            </Button>                        
                        </DialogActions>
                    </div>
                </Dialog>
        )
    }    
}

const styles = () => ({
    root: {
        background: 'white',
    },
    colorBlock: {
        display: 'block',
        height: 'auto',
        textAlign: 'center',
    },
    color: {
        padding: 40,
        paddingTop: '40px !important',
        margin: 4,
        outline: '1px solid lightslategrey',
        '&:hover': {
            boxShadow: '3px 3px 2px 0px lightgrey',
        }
    },
    selected: {
        padding: 40,
        paddingTop: '40px !important',
        outline: '3px solid lightgrey',
        boxShadow: '3px 3px 2px 0px lightgrey',
        outlineOffset: -3,
        margin: 4,
    }
})

export default withStyles(styles)(SelectColor)