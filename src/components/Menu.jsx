import React from 'react'
import {object, func, bool, string} from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import ViewIcon from '@material-ui/icons/Pageview'
import SaveIcon from '@material-ui/icons/Save'

class Menu extends React.Component {
    static propTypes = {
        classes:    object.isRequired,
        display:    bool,
        mode:       string.isRequired,
        save:       func.isRequired,
        changeMode: func.isRequired,
    }

    render(){
        const {
            classes, 
            display,
            mode,
            save,
            changeMode,
        } = this.props
        if(display){
            return (
                <div className={classes.menu}>
                    <Tooltip title='Сохранить страницу'>
                        <Button                                
                            onClick={save}
                            className={classes.menuButton}                            
                        >
                            <SaveIcon/>Сохранить
                        </Button>   
                    </Tooltip>
                    {
                        mode === 'edit' &&
                        <Tooltip title='Предпросмотр страницы'>
                            <Button
                                className={classes.menuButton}
                                onClick={() => changeMode('preview')}
                            >
                                <ViewIcon/>Предпросмотр
                            </Button>
                        </Tooltip>
                    }
                    {
                        mode === 'preview' &&
                        <Tooltip title='Редактирование страницы'>
                            <Button
                                className={classes.menuButton}
                                onClick={() => changeMode('edit')}
                            >
                                <ViewIcon/>Редактор
                            </Button>
                        </Tooltip>
                    }                        
                </div>
            )
        } else return null 
    }
}

const styles = () => ({
    menu: {
        textAlign: 'center',
        marginBottom: 30,
        paddingTop: 10,
        width: '100%',
    },
    menuButton: {
       backgroundColor: '#e0e0e0',
       marginRight: 7,
    },
})

export default withStyles(styles)(Menu)