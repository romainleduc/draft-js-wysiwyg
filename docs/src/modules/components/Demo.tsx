import React, { useState } from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import copy from 'clipboard-copy';
import MarkdownElement from './MarkdownElement';
import {
  Tooltip,
  IconButton,
  Collapse,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  preview: {
    '& .MuiToggleButton-root': {
      border: 0,
    },
    '& .draft-toolbar': {
      backgroundColor: '#ccd5df57',
      border: `1px solid ${theme.palette.divider}`,
      padding: 4,
      '& .MuiToggleButtonGroup-root': {
        display: 'block',
      },
    },
    '& .draft-editor': {
      border: `1px solid ${theme.palette.divider}`,
      borderTop: 0,
      minHeight: 141,
      padding: 5,
    },
  },
  code: {
    maxHeight: 'min(68vh, 1000px)',
    overflow: 'auto',
  },
}));

const Demo = ({
  component: Component,
  raw,
  language,
}: {
  component: any;
  raw: string;
  language: string;
}): JSX.Element => {
  const classes = useStyles();
  const [showCode, setShowCode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShowCode = () => {
    setShowCode(!showCode);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyCode = async () => {
    await copy(raw);
    setSnackbarOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.preview}>
        <NoSsr>
          <Component />
        </NoSsr>
      </div>
      <div className={classes.toolbar}>
        <Tooltip title="Show the source" placement="top">
          <IconButton onClick={handleShowCode}>
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy the source" placement="top">
          <IconButton onClick={handleCopyCode}>
            <FileCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <Collapse in={showCode}>
        <MarkdownElement
          className={classes.code}
          isHighlightedCode
          htmlOrRaw={raw}
          language={language}
        />
      </Collapse>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="The source code has been copied."
      />
    </div>
  );
};

export default Demo;
