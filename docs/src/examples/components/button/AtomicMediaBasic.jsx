import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicMediaButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, Box, Tabs, Tab, GridList, GridListTile, fade } from '@material-ui/core';
import { ImageOutlined, PlayArrowRounded } from '@material-ui/icons';
import { EditorState } from 'draft-js';
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
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${fade('#000', .7)}`,
    padding: theme.spacing(2),
    outline: 0,
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

/**
 * The example data is structured as follows:
 *
 * const mediaData = [
 *   [
 *     {
 *       type: 'img',
 *       tooltip: 'Image',
 *       background: 'path/to/background.jpg',
 *       mediaProps: {
 *         src: 'path/to/image.jpg',
 *       },
 *     },
 *     {
 *       [etc...]
 *     },
 *   ],
 *   [
 *     {
 *       type: 'audio',
 *       tooltip: 'Audio',
 *       background: 'path/to/background.jpg',
 *       mediaProps: {
 *         src: 'path/to/audio.mp3',
 *         controls: true,
 *       },
 *     },
 *     {
 *       [etc...]
 *     },
 *   ],
 *   [
 *     {
 *       type: 'video',
 *       tooltip: 'Video',
 *       background: 'path/to/background.jpg',
 *       mediaProps: {
 *         src: 'path/to/video.mp4',
 *         controls: true,
 *       },
 *     },
 *     {
 *       [etc...]
 *     },
 *   ],
 * ];
 */
const AtomicMediaModal = (props) => {
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='Media tabs example'
        >
          <Tab label='Image' />
          <Tab label='Audio' />
          <Tab label='Video' />
        </Tabs>
        {mediaData.map((media, key) => (
          <TabPanel
            key={key}
            value={value}
            index={key}
          >
            <GridList
              className={classes.gridList}
              spacing={10}
              cellHeight={140}
              cols={3}
            >
              {media.map(({
                type,
                background,
                tooltip,
                mediaProps,
              }, key) => (
                <GridListTile key={key}>
                  <Tooltip
                    title={tooltip}
                    placement='top'
                  >
                    <AtomicMediaButton
                      className={classes.media}
                      style={{ backgroundImage: `url('${background}')` }}
                      onInserted={() => props.onClose()}
                      atomicMediaProps={mediaProps}
                      component='span'
                    >
                      {['audio', 'video'].includes(type) &&
                        <PlayArrowRounded style={{
                          fontSize: 45,
                          color: '#fff',
                        }} />
                      }
                    </AtomicMediaButton>
                  </Tooltip>
                </GridListTile>
              ))}
            </GridList>
          </TabPanel>
        ))}
      </div>
    </Modal >
  );
}

const BasicExample = () => {
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
      onChange={setEditorState}
    >
      <EditorToolbar>
        <IconButton onClick={handleClick}>
          <ImageOutlined />
        </IconButton>
        <AtomicMediaModal
          open={open}
          onClose={handleClick}
        />
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
}

export default BasicExample;