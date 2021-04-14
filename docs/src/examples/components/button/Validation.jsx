import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicMediaButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, FormHelperText, Typography, fade } from '@material-ui/core';
import { ImageOutlined, Panorama } from '@material-ui/icons';
import { Switch } from '@material-ui/core';
import clsx from 'clsx';
import { EditorState } from 'draft-js';

const useStyles = makeStyles((theme => ({
  iconHidden: {
    display: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${fade('#000', .7)}`,
    padding: theme.spacing(2),
    outline: 0,
    '& p': {
      textAlign: 'center',
    }
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 230,
    backgroundColor: theme.palette.background['level1'],
    marginBottom: theme.spacing(2),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },
})));

const EditorModal = (props) => {
  const [hasErrors, setHasErrors] = useState(false);
  const imgUrl = '/static/images/media/nuffy.jpg';
  const classes = useStyles();

  const handleChangeChecked = () => {
    setHasErrors(!hasErrors);
  }

  return (
    <Modal className={classes.modal} {...props}>
      <div className={classes.paper}>
        <Typography
          component='h2'
          variant='h3'
          align='center'
          gutterBottom
        >
          Add image
        </Typography>
        <Switch
          checked={!hasErrors}
          onChange={handleChangeChecked}
          color='primary'
          name='switch-media'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <div
          className={classes.preview}
          style={{
            backgroundImage: !hasErrors && `url('${imgUrl}')`,
          }}
        >
          <Panorama
            className={clsx(!hasErrors && classes.iconHidden)}
            size='large'
          />
        </div>
        {hasErrors &&
          <FormHelperText error>
            Errors were found
          </FormHelperText>
        }
        <AtomicMediaButton
          variant='contained'
          color='primary'
          disabled={hasErrors}
          onInserted={() => props.onClose()}
          atomicMediaProps={{
            src: imgUrl,
          }}
        >
          Insert
        </AtomicMediaButton>
      </div>
    </Modal>
  );
}

const Image = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <EditorContainer
      editorState={editorState}
      onChange={(newEditorState) => {
        setEditorState(newEditorState);
      }}
    >
      <EditorToolbar>
        <IconButton onClick={handleClick}>
          <ImageOutlined />
        </IconButton>
        <EditorModal
          open={open}
          onClose={handleClick}
        />
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
}

export default Image;