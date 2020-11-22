import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicMediaButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Button, FormHelperText, fade } from '@material-ui/core';
import { ImageOutlined, Panorama } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 600,
  },
  itemList: {
    padding: 5,
    width: 150,
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
  test: {
    padding: 0,
    border: 'solid 1px #000000c9'
  },
  iconHidden: {
    display: 'none',
  }
})));

const MediaUpload = ({ id, children, validate, onChange, ...other }) => {
  const handleChange = (e) => {
    const { files } = e.target;

    if (files) {
      onChange(files[0], validate?.(files[0]));
    }
  }

  return (
    <label htmlFor={id}>
      <input
        id={id}
        style={{ display: 'none' }}
        type="file"
        onChange={handleChange}
        {...other}
      />
      {children}
    </label>
  );
}

const EditorModal = (props) => {
  const [objectURL, setObjectURL] = useState();
  const [errors, setErrors] = useState();
  const classes = useStyles();

  const handleChangeMedia = (file, errors) => {
    setObjectURL(URL.createObjectURL(file));
    setErrors(errors);
  }

  const validate = (file) => {
    const errors = {};

    if (!/^(image\/png|image\/jpeg)$/g.test(file.type)) {
      errors.image = 'Type incorrect';
    }

    return errors;
  }

  const hasErrors = () => {
    return errors?.image || (!errors && !objectURL)
  }

  return (
    <Modal className={classes.modal} {...props}>
      <div className={classes.paper}>
        <div
          className={classes.preview}
          style={{
            backgroundImage: `url('${objectURL}')`
          }}
        >
          <Panorama
            className={clsx(!hasErrors() && classes.iconHidden)}
            size='large'
          />
        </div>
        <MediaUpload
          id='image-validation'
          onChange={handleChangeMedia}
          validate={validate}
        >
          <Button
            fullWidth
            component='span'
            color='primary'
            variant='contained'
          >
            Choose file
          </Button>
        </MediaUpload>
        {errors &&
          <FormHelperText error>
            {errors.image}
          </FormHelperText>
        }
        <AtomicMediaButton
          mediaType='image'
          disabled={hasErrors()}
          onInserted={() => props.onClose()}
          src={objectURL}
        >
          Insert
        </AtomicMediaButton>
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