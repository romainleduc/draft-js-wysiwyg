import React from 'react';
import { MediaButton, EditorContainer, EditorToolbar, Editor } from 'draft-js-wysiwyg';
import { makeStyles, List, ListItem, Modal, IconButton, Tooltip } from '@material-ui/core';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import imgData from './imgData';

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
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000000c9',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  test: {
    padding: 0,
    border: 'solid 1px #000000c9'
  },
})));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const imgData = [
 *   {
 *     src: image,
 *     title: 'Image',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const EditorModal = (props) => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} {...props}>
      <div className={classes.paper}>
        <List className={classes.list}>
          {imgData.map(({ title, src }) => (
            <ListItem className={classes.itemList}>
              <Tooltip title={title} placement='top'>
                <MediaButton
                  className={classes.test}
                  mediaType='image'
                  component='span'
                  src={src}
                  onInserted={() => props.onClose()}
                >
                  <img src={src} />
                </MediaButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
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
          <ImageOutlinedIcon />
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