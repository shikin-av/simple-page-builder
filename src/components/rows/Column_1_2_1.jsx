import React from 'react'

import Grid from '@material-ui/core/Grid'

import Svg from '../../svg/column-1-2-1.svg'
import ElementPlace from '../ElementPlace'
import DividerVertical from '../DividerVertical'
import row from './row'

export const Column_1_2_1 = row(props => (
    <Grid container>
        <Grid item xs={12} sm={3}>
            <ElementPlace 
                {...props}
                element={props.elements[0]}
                rowPlace={0}
            />
        </Grid>
        <DividerVertical/>
        <Grid item xs={12} sm={6}>
            <ElementPlace 
                {...props}
                element={props.elements[1]}
                rowPlace={1}
            />
        </Grid>
        <DividerVertical/>
        <Grid item xs={12} sm={3}>
            <ElementPlace 
                {...props}
                element={props.elements[2]}
                rowPlace={2}
            />
        </Grid>
    </Grid>
))

export const Preview = props => {
    const {elements} = props
    let content1 = null
    let content2 = null
    let content3 = null
    if(elements.length){
        if(elements[0] && elements[0].hasOwnProperty('content')) content1 = elements[0].content
        if(elements[1] && elements[1].hasOwnProperty('content')) content2 = elements[1].content    
        if(elements[2] && elements[2].hasOwnProperty('content')) content3 = elements[2].content    
    }
    return (
        <Grid container className='preview'>            
            <Grid 
                item 
                xs={12} sm={3} 
                dangerouslySetInnerHTML={{__html: content1}}
                className='preview-element'
            />
            <Grid 
                item 
                xs={12} sm={6} 
                dangerouslySetInnerHTML={{__html: content2}}
                className='preview-element'
            />
            <Grid 
                item 
                xs={12} sm={3} 
                dangerouslySetInnerHTML={{__html: content3}}
                className='preview-element'
            />            
        </Grid>
    )
}

export const Icon = Svg