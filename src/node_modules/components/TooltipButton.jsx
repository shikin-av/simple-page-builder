import React from 'react'
import {
    object,
    string,
    bool,
    func,
    node
} from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

class TooltipButton extends React.Component {
    static propTypes = {
        tooltip:      string.isRequired,
        className:    string,
        style:        object,
        isDisabled:   bool,
        clickHandler: func.isRequired,
        children:     node,
    }

    render(){
        const {
            tooltip,
            className,
            style,
            isDisabled,
            clickHandler,
            children
        } = this.props
        return (
            <Tooltip title={tooltip}>
                <IconButton
                    className={className}
                    style={style}
                    onClick={clickHandler}
                    disabled={isDisabled}
                >
                    {children}
                </IconButton>
            </Tooltip>
        )
    }
}

export default TooltipButton
