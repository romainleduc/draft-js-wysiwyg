import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicImageButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, FormHelperText, Typography } from '@material-ui/core';
import { ImageOutlined, Panorama } from '@material-ui/icons';
import { Switch } from '@material-ui/core';
import clsx from 'clsx';

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
    border: '1px solid #000000c9',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
    marginBottom: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.text.secondary
  },
})));

const EditorModal = (props) => {
  const [hasErrors, setHasErrors] = useState(false);
  const imgUrl = '/assets/static/images/media/dairypanda.png'; 
  const classes = useStyles();

  const handleChangeChecked = () => {
    setHasErrors(!hasErrors);
  }

  return (
    <Modal className={classes.modal} {...props}>
      <div className={classes.paper}>
        <Typography variant='h3' align='center'>Add image</Typography>
        <Switch
          checked={!hasErrors}
          onChange={handleChangeChecked}
          color='primary'
          name='checked-media'
          inputProps={{'aria-label': 'primary checkbox' }}
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
        <AtomicImageButton
          disabled={hasErrors}
          onInserted={() => props.onClose()}
          atomicImageProps={{
            src: imgUrl,
          }}
        >
          Insert
        </AtomicImageButton>
      </div>
    </Modal>
  );
}

const Image = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <EditorContainer>
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