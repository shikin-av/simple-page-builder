import React from 'react'
import {array, object, func} from 'prop-types'

import Grid from '@material-ui/core/Grid'

import Svg from '../../svg/column-2-1.svg'
import ElementPlace from '../ElementPlace'
import DividerVertical from '../DividerVertical'

export const Column_2_1 = props => {   
    const {
        elements, 
        row,
        deleteElementHandler,
        addElementHandler,
        changeContentHandler,
    } = props
    return (
        <Grid container>
            <Grid item xs={12} sm={8}>
                <ElementPlace 
                    element={elements[0]}
                    row={row}
                    rowPlace={0}
                    deleteElementHandler={deleteElementHandler}
                    addElementHandler={addElementHandler}
                    changeContentHandler={changeContentHandler}
                />
            </Grid>
            <DividerVertical/>
            <Grid item xs={12} sm={4}>
                <ElementPlace 
                    element={elements[1]}
                    row={row}
                    rowPlace={1}
                    deleteElementHandler={deleteElementHandler}
                    addElementHandler={addElementHandler}
                    changeContentHandler={changeContentHandler}
                />
            </Grid>
        </Grid>
    )            
}

Column_2_1.propTypes = {
    elements:             array.isRequired,
    row:                  object.isRequired,
    deleteElementHandler: func.isRequired,
    addElementHandler:    func.isRequired,
    changeContentHandler: func.isRequired,
}

export const Preview = props => {
    const {elements} = props
    let content1 = null
    let content2 = null
    if(elements.length){
        if(elements[0] && elements[0].hasOwnProperty('content')) content1 = elements[0].content
        if(elements[1] && elements[1].hasOwnProperty('content')) content2 = elements[1].content    
    }    
    return (
        <Grid container className='preview'>
            <Grid 
                item 
                xs={12} sm={8} 
                dangerouslySetInnerHTML={{__html: content1}}
                className='preview-element'
            />
            <Grid 
                item 
                xs={12} sm={4} 
                dangerouslySetInnerHTML={{__html: content2}}
                className='preview-element'
            />
        </Grid>
    )
}

export const Icon = Svg