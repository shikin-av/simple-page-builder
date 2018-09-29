import React from 'react'
import {any, func, string} from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

const ToolButton = props => {
    const {
        icon, 
        clickHandler, 
        type, 
        classes
    } = props
    const Icon = icon
    return (
        <Button 
            className={classes.button}            
        >
            {
                Icon && 
                <Icon 
                    width={60} 
                    height={60}
                    onClick={() => clickHandler(type)}
                />
            }
        </Button>
    )
}

ToolButton.propTypes = {
    icon:         any.isRequired,
    clickHandler: func.isRequired,
    type:         string.isRequired,
}

const styles = theme => ({
    button: {
        fill: window.theme.palette.background,

        '&:hover': {
            fill: window.theme.palette.primary.main,    
            transition: '0.3s',
        }
    },
})

export default withStyles(styles)(ToolButton)