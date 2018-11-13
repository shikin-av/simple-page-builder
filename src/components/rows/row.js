import React from 'react'
import {array, object, func} from 'prop-types'

const row = Row =>
    class extends React.Component {
        static propTypes = {
            elements:             array.isRequired,
            row:                  object.isRequired,
            deleteElementHandler: func.isRequired,
            addElementHandler:    func.isRequired,
            changeContentHandler: func.isRequired,
            theme:                object.isRequired,
        }
        render = () => <Row {...this.props}/>
    }

export default row