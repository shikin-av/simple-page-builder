import React from 'react'
import Grid from '@material-ui/core/Grid'
import icon from '../../svg/column-2-1.svg'
import rowRender, {sectionHoc as section} from './rowRender'

const sections = [
    section(props => <Grid item xs={12} sm={8} {...props}/>),
    section(props => <Grid item xs={12} sm={4} {...props}/>),
]

export default rowRender({
	name: 'column2_1',
	sections,
	icon,
})