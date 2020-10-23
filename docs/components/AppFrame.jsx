import React from 'react';
import {
    Typography,
    IconButton,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    GitHub as GithubIcon,
} from '@material-ui/icons';

const AppFrame = ({ children }) => {
    return (
        <div class='root'>
            <AppBar
                className='appBar'
                position='static'
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className='menuButton'
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className='title' variant="h6" noWrap>
                        Draft-js-wysiwyg
                </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                        <IconButton
                            component='a'
                            color="inherit"
                            href='https://github.com/KiziKr/draft-js-wysiwyg'
                            edge="end"
                        >
                            <GithubIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
};

export default AppFrame;