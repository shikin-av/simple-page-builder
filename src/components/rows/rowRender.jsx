import React from 'react'
import {
	array, 	
	func, 
	object,
	string,
	element, 
	shape
} from 'prop-types'
import ElementPlace from '../ElementPlace'

export const sectionHoc = Component => {
	return class extends React.Component {		
		render(){
			const componentProps = Component().props
			const commonProps = {
				...componentProps, 
				...this.props,
				className: `${this.props.className} ${componentProps.className ? componentProps.className : ''}`,
			}
			let element = null
			switch(this.props.type){
				case 'edit': 
					element = <ElementPlace 
						{...commonProps}						
					/>
					break;
				case 'preview':
					const {elements, rowPlace} = commonProps					
					let content = null
					if(
						elements[rowPlace] && 
						elements[rowPlace].hasOwnProperty('content')
					) content = elements[rowPlace].content
					element = <div {...commonProps} dangerouslySetInnerHTML={{__html: content}}/>
					break;
				default: element = null;
			}
			return (
				<Component 					
					className={commonProps.className}
					style={{
						display: 'inline-block',
						width: '100%',
					}}
				>
					{element}
				</Component>
			)
		}
	}
}

sectionHoc.propTypes = {
	Component: element.isRequired,
}

const SectionsRender = ({name, sections=[], className='', classNameWrapper='', type='preview', props}) => {
	const {elements} = props
	let elementNumber = -1
	return (
		<div className={`${classNameWrapper} ${name}`}>
			{sections.map(Section => {
				elementNumber++
				return (					
					<Section
						className={className}
						key={elementNumber}
						type={type}
						element={elements[elementNumber]}
						rowPlace={elementNumber}
						{...props}
					/>
				)
			})}
		</div>
	)
}

SectionsRender.propTypes = {
	name:      		  string,
	sections:  		  array,
	className: 		  string,
	classNameWrapper: string,
	type:      		  string,
	props:     		  shape({
		elements:             array.isRequired,
		row:                  object.isRequired,
		deleteElementHandler: func.isRequired,
		addElementHandler:    func.isRequired,
		changeContentHandler: func.isRequired,
		theme:                object.isRequired,
	})
}

const rowRender = ({
    name, 
    sections=[], 
    icon,    
}) => {		
	return {
		name,
		edit:    props => SectionsRender({
			name, 
			sections, 
			classNameWrapper: 'edit', 
			type:             'edit', 
			props
		}),
		preview: props => SectionsRender({
			name, 
			sections, 
			className:        'preview-element', 
			classNameWrapper: 'preview', 
			type:             'preview', 
			props
		}),
		icon,
	}
}

rowRender.propTypes = {
	name: 	  string,
	sections: array,
	icon: 	  func.isRequired,
}

export default rowRender