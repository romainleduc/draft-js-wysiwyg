import React, { useState } from 'react';
import { EditorContainer, EditorToolbar, Editor, AtomicMediaButton } from 'draft-js-wysiwyg';
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
            value={value}
            index={key}
          >
            <GridList
              className={classes.gridList}
              spacing={10}
              cellHeight={140}
              cols={3}
            >
              {media.map(({ background, tooltip, type, src }) => (
                <GridListTile>
                  <Tooltip
                    title={tooltip}
                    placement='top'
                  >
                    <AtomicMediaButton
                      className={classes.media}
                      style={{ backgroundImage: `url('${background}')` }}
                      onInserted={() => props.onClose()}
                      component='span'
                      mediaType={type}
                      src={src}
                    >
                      {type !== 'image' &&
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
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
}

export default Media;

{/* <>
  <AtomicImageButton
    onInserted={() => props.onClose()}
    className={classes.media}
    customControl={ }
    imgProps={{ src }}
  >
  </AtomicImageButton>

  <AtomicVideoButton
    onInserted={() => props.onClose()}
    className={classes.media}
    customControl={ }
    videoProps={{ src }}
  >
  </AtomicVideoButton>
</> */}