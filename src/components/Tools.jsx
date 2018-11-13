import React from 'react'
import {object, func} from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import rows from './rows'
import ToolButton from './ToolButton'
import Animation from './Animation'

class Tools extends React.Component {
    static propTypes = {
        classes:          object.isRequired,
        selectRowHandler: func.isRequired,
        theme:            object.isRequired,
    }

    render(){
        const {
            classes, 
            selectRowHandler,
            theme,
        } = this.props
        return (
            <Toolbar 
                className={classes.root}
                style={{
                    background: theme.palette.contrast,
                    border:     `3px solid ${theme.palette.primary.main}`,
                }}
            >
                <div className={classes.panel}>                    
                    <Animation animationCssClass='animTranslateX'>
                        <div className={classes.titleBlock}>
                            <Typography
                                variant='button'
                                gutterBottom
                                style={{
                                    color: theme.palette.background,
                                }}
                            >
                                Выберите блок
                            </Typography>
                        </div>
                        {
                            rows.map(row => {
                                const {type, icon} = row
                                return (
                                    <ToolButton
                                        icon={icon}
                                        key={type}
                                        type={type}
                                        clickHandler={selectRowHandler}
                                        theme={theme}
                                    />
                                )
                            })
                        }
                    </Animation>
                </div>
            </Toolbar>
        )
    }
}

const styles = () => ({
    root: {
        borderLeft: 0,
        borderRight: 0,
    },
    panel: {
        margin: '0 auto',
    },
    titleBlock: {
        textAlign: 'center',
        marginBottom: -10,
        paddingTop: 15,
    },
})

export default withStyles(styles)(Tools)
