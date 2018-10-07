import React from 'react'
import {any, func, string, object} from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'

import Button from '@material-ui/core/Button'

class ToolButton extends React.Component {
    static propTypes = {
        icon:         any.isRequired,
        clickHandler: func.isRequired,
        type:         string.isRequired,
        theme:        object.isRequired,
    }

    render() {
        const {
            icon, 
            clickHandler, 
            type, 
            classes,
            theme,
        } = this.props
        const Icon = icon
        return (
            <Button             
                style={{
                    fill: theme.palette.background,
                }}
                ref={'toolBtn'}                            
                onMouseLeave={() => {
                    const el = ReactDOM.findDOMNode(this.refs.toolBtn)
                    el.style.fill = theme.palette.background
                }}
                onMouseEnter={() => {
                    const el = ReactDOM.findDOMNode(this.refs.toolBtn)
                    el.style.fill = theme.palette.primary.main
                }}
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
}

const styles = () => ({
    button: {
        '&:hover': {
            transition: '0.3s',
        }
    },
})

export default withStyles(styles)(ToolButton)