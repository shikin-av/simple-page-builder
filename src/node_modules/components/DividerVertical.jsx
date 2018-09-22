import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'

const DividerVertical = props => (
    <div className={props.classes.root}></div>
)

const styles = theme => ({
    root: {
        borderLeft: `1px solid ${grey[400]}`,
        marginRight: '-1px',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    }
})

export default withStyles(styles)(DividerVertical)
