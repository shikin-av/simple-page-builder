import React from 'react'
import {withStyles} from '@material-ui/core/styles'

const DividerVertical = props => (
    <div className={props.classes.root}></div>
)

const styles = theme => ({
    root: {
        borderLeft: `1px solid #0000001f`,
        marginRight: '-1px',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    }
})

export default withStyles(styles)(DividerVertical)
