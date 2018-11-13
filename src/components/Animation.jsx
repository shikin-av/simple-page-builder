import React from 'react'
import {string, number, node} from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Animation = props => {
    const {
        children,
        animationCssClass,
        time,
    } = props    

    return (
        <ReactCSSTransitionGroup
            transitionName={animationCssClass}
            transitionAppear={true}
            transitionAppearTimeout={time}
            transitionEnter={true}
            transitionEnterTimeout={time}
            transitionLeave={true}
            transitionLeaveTimeout={time}
        >
            {children}
        </ReactCSSTransitionGroup>
    )
}

Animation.propTypes = {
    children:          node.isRequired,
    animationCssClass: string,
    time:              number,
}

Animation.defaultProps = {
    animationCssClass: 'animOpacity',
    time:              1900,
}

export default Animation