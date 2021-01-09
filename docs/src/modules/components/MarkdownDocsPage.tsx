import React from 'react';
import AppHead from './AppHead';
import MarkdownDocs from './MarkdownDocs';
import AppFrame from './AppFrame';
import { useWindowSize } from '../hooks/useWindowSize';
import { makeStyles } from '@material-ui/core';

interface MarkdownDocsPageProps {
  title: string;
  description: string;
  markdown: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 180,
    },
  },
}));

const MarkdownDocsPage = ({
  title,
  description,
  markdown,
}: MarkdownDocsPageProps): JSX.Element => {
  const { width } = useWindowSize();
  const classes = useStyles();

  return (
    <AppFrame disablePermanent={width < 1280} className={classes.root}>
      <AppHead title={title} description={description} />
      <MarkdownDocs markdown={markdown} />
    </AppFrame>
  );
};

export default MarkdownDocsPage;
