import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicMediaButton, MediaControl, PlayPauseButton, MuteUnmuteButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, Box, Typography, Tabs, Tab, GridList, GridListTile, fade } from '@material-ui/core';
import { ImageOutlined, PlayArrowRounded } from '@material-ui/icons';
import mediaData from './mediaData';

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
  hidden: {
    display: 'none',
  }
})));

const AudioControlCustom = (audio) => {
  return (
    <MediaControl media={audio}>
      <PlayPauseButton/>
      <MuteUnmuteButton />
    </MediaControl>
  );
}

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      className={classes.modal}
      {...props}
    >
      <div className={classes.paper}>

        <AtomicMediaButton
          className={classes.media}
          style={{ backgroundImage: `url('/assets/static/images/media/nuffy.jpg')` }}
          onInserted={() => props.onClose()}
          component='span'
          mediaType={'audio'}
          src={`/static/audios/media/Shine.mp3`}
          customControls={AudioControlCustom}
        />
      </div >
    </Modal >
  );
}

const Media = () => {
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
      <Editor
      mediaPlayerProps={{
        customControls: {
          youtube: '',
          audio: '',
          video: ''
        },
        customWrapper: {
          audio: '',
          video: ''
        },
        config: {
          youtube: {
            playerVars: {
              origin: '',
            }
          }
        },
        playIcon: <div></div>,
        light: false,
      }}
        //audioControl={AudioControlCustom}
        placeholder='Enter some text..'
      />
    </EditorContainer>
  );
}

export default Media;