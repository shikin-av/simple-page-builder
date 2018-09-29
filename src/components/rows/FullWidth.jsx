import React from 'react'
import {array, object, func} from 'prop-types'

import Grid from '@material-ui/core/Grid'

import Svg from '../../svg/column-full.svg'
import ElementPlace from '../ElementPlace'

export const FullWidth = props => {
    const {
        elements, 
        row,
        deleteElementHandler,
        addElementHandler,
        changeContentHandler,
    } = props
    return (
        <Grid container>
            <Grid item xs={12} className='fullwidth'>
                <ElementPlace 
                    element={elements[0]}
                    row={row}
                    rowPlace={0}
                    deleteElementHandler={deleteElementHandler}
                    addElementHandler={addElementHandler}
                    changeContentHandler={changeContentHandler}
                />
            </Grid>
        </Grid>
    )            
}

FullWidth.propTypes = {
    elements:             array.isRequired,
    row:                  object.isRequired,
    deleteElementHandler: func.isRequired,
    addElementHandler:    func.isRequired,
    changeContentHandler: func.isRequired,
}

export const Preview = props => {
    const {elements} = props
    let content = null
    if(elements[0] && elements[0].hasOwnProperty('content')){
        content = elements[0].content
    }    
    return (
        <Grid container className='preview fullwidth'>
            <Grid 
                item 
                xs={12} 
                dangerouslySetInnerHTML={{__html: content}}
                className='preview-element'
            />
        </Grid>
    )
}

export const Icon = Svg