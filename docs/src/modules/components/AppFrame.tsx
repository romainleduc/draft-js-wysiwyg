import React from 'react';
import {
    IconButton,
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon, GitHub as GithubIcon } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        width: 'calc(100% - 0px)',
    },
    content: {
        flex: 1,
    },
});

interface AppFrameProps {
    children: any;
}

const AppFrame = ({ children }: AppFrameProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className="menuButton"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <div>
                        <IconButton
                            component="a"
                            color="inherit"
                            href="https://github.com/KiziKr/draft-js-wysiwyg"
                            edge="end"
                        >
                            <GithubIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default AppFrame;
