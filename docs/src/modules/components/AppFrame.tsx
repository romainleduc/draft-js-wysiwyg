import React, { useState, ReactNode } from 'react';
import { IconButton, AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { Menu as MenuIcon, GitHub as GithubIcon } from '@material-ui/icons';
import AppDrawer from './AppDrawer';

const useStyles = makeStyles((theme => ({
    root: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 180,
        },
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
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
})));

interface AppFrameProps {
    children: ReactNode;
}

const AppFrame = ({ children }: AppFrameProps): JSX.Element => {
    const [openDrawer, setOpenDrawer] = useState(true);
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
            <AppDrawer
                className={classes.drawer}
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            />
            {children}
        </div>
    );
};

export default AppFrame;
