import React from 'react'
import {string} from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const DividerGorizontal = props => (
    <Divider
        className={props.classes.root}
        style={
            props.mode === 'preview' ?
            {
                opacity: 0,
            } : {
                opacity: 1,
                backgroundColor: '#0000001f',
            }
        }
    />
)

DividerGorizontal.propTypes = {
    mode: string
}

const styles = () => ({
    root: {
        width: '100%',
    }
})

export default withStyles(styles)(DividerGorizontal)
