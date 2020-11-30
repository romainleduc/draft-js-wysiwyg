import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import {
  Drawer,
  List,
  ListItem,
  Link,
  ListItemText,
  makeStyles,
  DrawerProps,
} from '@material-ui/core';
import pages from '../../pages';
import AppDrawerNavItem from './AppDrawerNavItem';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const AppDrawer = ({ onClose, ...other }: DrawerProps): JSX.Element => {
  const classes = useStyles();
  const { width } = useWindowSize();
  const [isMobileSize, setIsMobileSize] = useState(width < 500);

  useEffect(() => {
    if ((!isMobileSize && width < 500) || (isMobileSize && width > 500)) {
      setIsMobileSize(!isMobileSize);
      onClose?.({}, 'escapeKeyDown');
    }
  }, [width]);

  return (
    <nav>
      <Drawer
        variant={isMobileSize ? 'temporary' : 'permanent'}
        onClose={onClose}
        {...other}
      >
        <List>
          {pages.map(({ title, children }, key) => (
            <AppDrawerNavItem key={`nav-item-${key}`} title={title}>
              {children.map((child, key) => (
                <List key={`drawer-list-${key}`} component="div" disablePadding>
                  <ListItem className={classes.nested} button>
                    <Link component={NextLink} href={child.pathname}>
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
