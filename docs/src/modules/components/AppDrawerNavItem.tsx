import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Collapse,
  makeStyles,
  ListItemProps,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 500,
  },
}));

interface AppDrawerNavItemProps extends ListItemProps {
  title: string;
}

const AppDrawerNavItem = ({
  title,
  children,
}: AppDrawerNavItemProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem onClick={handleClick} button>
        <ListItemText classes={{ primary: classes.title }} primary={title} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export default AppDrawerNavItem;
