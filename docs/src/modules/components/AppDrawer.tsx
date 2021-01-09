import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  Link,
  ListItemText,
  makeStyles,
  DrawerProps,
  Divider,
} from '@material-ui/core';
import pages from '../../pages';
import AppDrawerNavItem from './AppDrawerNavItem';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    padding: 10,
  },
}));

const AppDrawer = ({ onClose, ...other }: DrawerProps): JSX.Element => {
  const classes = useStyles();

  return (
    <nav>
      <Drawer onClose={onClose} {...other}>
        <div className={classes.toolbar}>
          <Link
            variant="h6"
            color="textSecondary"
            href="test"
            component="button"
          >
            Draft-js-wysiwyg
          </Link>
        </div>
        <Divider />
        <List>
          {pages.map(({ title, pathname, children }, key) => (
            <AppDrawerNavItem key={`nav-item-${key}`} title={title}>
              {children.map((child, key) => (
                <List key={`drawer-list-${key}`} component="div" disablePadding>
                  <ListItem className={classes.nested} button>
                    <Link
                      component={NextLink}
                      href={`${pathname}${child.pathname}`}
                      passHref
                    >
                      <ListItemText primary={child.title} />
                    </Link>
                  </ListItem>
                </List>
              ))}
            </AppDrawerNavItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
};

export default AppDrawer;
