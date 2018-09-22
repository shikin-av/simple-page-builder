import React from 'react'
import {
    string, 
    func,
    bool,
} from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const Delete = props => (
    <Dialog
        open={props.showDialog}
        onClose={props.cancelHandler}
        aria-labelledby='delete-dialog-title'
    >
        <div className={props.classes.root}>
            <DialogTitle id='delete-dialog-title'>{props.title}</DialogTitle>
            <DialogActions>
                <Button 
                    onClick={props.acceptHandler} 
                    color='primary' 
                    autoFocus
                >
                    Да
                </Button>
                <Button 
                    onClick={props.cancelHandler}
                    color='primary'
                >
                    Нет
                </Button>                        
            </DialogActions>
        </div>
    </Dialog>
)

const styles = () => ({
    root: {
        background: 'white',
    }
})

Delete.propTypes = {
    title:         string.isRequired,
    showDialog:    bool.isRequired,
    acceptHandler: func.isRequired,
    cancelHandler: func.isRequired,
}

export default withStyles(styles)(Delete)