import React from 'react'
import Grid from '@material-ui/core/Grid'
import icon from '../../svg/column-full.svg'
import rowRender, {sectionHoc as section} from './rowRender'

const sections = [
    section(props => <Grid item xs={12} {...props}/>)
]

export default rowRender({
	name: 'fullwidth',
	sections,
	icon,
})