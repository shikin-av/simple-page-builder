# Simple Page Builder

Take a look: [page-builder.ml](http://page-builder.ml)

Single-page application for filling pages with content

### Made with: 
* React
* create-react-app
* [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
* Material-UI

************
## Usage:
Take a look: `src/demo.js`

Application as a module:

	import SPB from 'SimplePageBuilder'
	import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
	import grey from '@material-ui/core/colors/grey'

	const save = rows => {
	    // use for save data
	}

	const getPageRows = () => {
	    // use for get data for SPB from your API
	    return []
	}

	const theme = createMuiTheme({
	    palette: {
	        primary:   {main: grey[500]},
	        secondary: {main: grey[300]},
	        background:       grey[50],
	        contrast:         grey[700],
	        menuBackground:   grey[100],
	        menuText:         grey[700]
	    },
	})

	ReactDOM.render(
	    <SPB 
	        saveHandler={save}
	        menu={true}
	        mode='edit'
	        getPageRows={getPageRows}
	        theme={theme}
	    />, 
	    document.getElementById('root')
	)

You can change the theme dynamically (take a look: `src/demo.js`)

`menu` - show menu

`mode`:

* `preview` - show getPageRows content in DOM
* `edit`    - show editor


### Scripts

`npm start`     - local web-server for development

`npm run build` - get production build

************

## Rows and Elements

`row`     - multicolumn grid DOM element

`element` - entity in `row` 

For example TextEditor made by react-draft-wysiwyg

`src/components/elements/TextEditor`

#### You can easily add your `rows` and `elements`:

### Rows

Stored in `src/components/rows`

Example for double column grid:

	import React from 'react'
	import icon from '../../svg/column-2.svg'
	import rowRender, {sectionHoc as section} from './rowRender'

	const sections = [
	    section(props => <div className='your-double-column' {...props}/>),
	    section(props => <div className='your-double-column' {...props}/>),
	]

	export default rowRender({
	    name: 'your-double-column-grid',
	    sections,
	    icon,
	})

Import your row component to `src/components/rows/index.js`

Likewise made `Element` - (take a look `src/components/elements`)

************
### Directories structure:
	build/   - production build
	config/  - create-react-app config
	scripts/ - create-react-app scripts
	public/  - static files
      src/
          components/
          elements/
          rows/
          App.jsx - application component
          ...
       ...
	demo.js  - example
	index.js - entry point
	...

