import React from 'react'

import Grid from '@material-ui/core/Grid'

import Svg from '../../svg/column-full.svg'
import ElementPlace from '../ElementPlace'
import row from './row'

export const FullWidth = row(props => (
    <Grid container>
        <Grid item xs={12} className='fullwidth'>
            <ElementPlace 
                {...props}
                element={props.elements[0]}
                rowPlace={0}
            />
        </Grid>
    </Grid>
))

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