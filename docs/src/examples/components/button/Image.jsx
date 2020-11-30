import React from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicImageButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, Box, Typography, Tabs, Tab, GridList, GridListTile, fade } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import imageData from './imageData';

const useStyles = makeStyles((theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridList: {
    height: 150,
    width: 600,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `solid 1px ${fade('#000', .7)}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: `solid 1px ${fade('#000', .6)}`,
    width: '100%',
    height: '100%',
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
    <Modal
      className={classes.modal}
      {...props}
    >
      <div className={classes.paper}>
          <Typography variant='h3'>Image</Typography>
        <Box p={3}>
            <GridList
              className={classes.gridList}
              spacing={10}
              cellHeight={140}
              cols={3}
            >
              {imageData.map(({ background, tooltip, src }, key) => (
                <GridListTile>
                  <Tooltip
                    title={tooltip}
                    placement='top'
                  >
                    <AtomicImageButton
                      className={classes.media}
                      style={{ backgroundImage: `url('${background}')` }}
                      onInserted={() => props.onClose()}
                      atomicImageProps={{ src }}
                      component='span'
                    />
                  </Tooltip>
                </GridListTile>
              ))}
            </GridList>
        </Box>
      </div>
    </Modal >
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