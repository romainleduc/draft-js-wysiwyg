import React, { useState } from 'react';
import { ToggleButtonGroup as DraftToggleButtonGroup, EditorContainer, EditorToolbar, Editor, AtomicMediaButton, InlineToggleButton, BlockTypeToggleButton, TextAlignToggleButton, IndentDraftButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, GridList, GridListTile, fade, Divider, withStyles, Select as MuiSelect, MenuItem, ButtonGroup as MuiButtonGroup, ButtonBase, Tabs, Tab, Box } from '@material-ui/core';
import { Code, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatBold, FormatIndentDecrease, FormatIndentIncrease, FormatItalic, FormatListBulleted, FormatListNumbered, FormatStrikethrough, FormatUnderlined, ImageOutlined, PlayArrowRounded } from '@material-ui/icons';
import mediaData from './components/button/mediaData';
import { EditorState } from 'draft-js';

const ToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(DraftToggleButtonGroup);

const ButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(MuiButtonGroup);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    border: 'none',
  },
}))(MenuItem);

const Select = withStyles((theme) => ({
  icon: {
    right: 4,
  },
}))(MuiSelect);

const BootstrapButton = withStyles((theme) => ({
  input: {
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      backgroundColor: "#fff",
    },
  },
}))(ButtonBase);

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
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  toolbar: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    padding: 4,
    backgroundColor: '#ccd5df57',
  },
  editor: {
    border: `1px solid ${theme.palette.divider}`,
    padding: 40,
    borderTop: 0,
    minHeight: 141,
    '& .DraftEditor-editorContainer': {
      maxHeight: 'min(68vh, 600px)',
      overflowY: 'auto',
    },
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

const LandingExample = () => {
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <EditorContainer
      noSsr
      editorState={editorState}
      onChange={setEditorState}
    >
      <EditorToolbar className={classes.toolbar}>
        <ToggleButtonGroup size="small">
          {[
            ['unstyled', 'Paragraph'],
            ['header-one', 'H1'],
            ['header-two', 'H2'],
            ['header-three', 'H3'],
            ['header-four', 'H4'],
            ['header-five', 'H5'],
            ['header-six', 'H6'],
            ['blockquote', 'Blockquote'],
            ['code-block', 'Code Block'],
          ].map((block) =>
            <BlockTypeToggleButton
              key={`basic-block-${block[0]}`}
              value={block[0]}
            >
              {block[1]}
            </BlockTypeToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ToggleButtonGroup size='small'>
          {[
            ['BOLD', <FormatBold />],
            ['ITALIC', <FormatItalic />],
            ['STRIKETHROUGH', <FormatStrikethrough />],
            ['UNDERLINE', <FormatUnderlined />],
            ['CODE', <Code />],
          ].map(inline =>
            <InlineToggleButton
              key={`inline-${inline[0]}`}
              value={inline[0]}
            >
              <Tooltip title={inline[0].charAt(0).toUpperCase() + inline[0].slice(1).toLowerCase()} placement='top'>
                {inline[1]}
              </Tooltip>
            </InlineToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ToggleButtonGroup size='small'>
          {[
            ['left', <FormatAlignLeft />],
            ['center', <FormatAlignCenter />],
            ['right', <FormatAlignRight />],
          ].map(inline =>
            <TextAlignToggleButton
              key={`align-${inline[0]}`}
              value={inline[0]}
            >
              {inline[1]}
            </TextAlignToggleButton>
          )}
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ToggleButtonGroup size='small'>
          <BlockTypeToggleButton value='unordered-list-item'>
            <Tooltip title='Unordered list' placement='top'>
              <FormatListBulleted />
            </Tooltip>
          </BlockTypeToggleButton>
          <BlockTypeToggleButton value='ordered-list-item'>
            <Tooltip title='Ordered list' placement='top'>
              <FormatListNumbered />
            </Tooltip>
          </BlockTypeToggleButton>
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ButtonGroup size='small'>
          <IndentDraftButton value='increase'>
            <FormatIndentIncrease />
          </IndentDraftButton>
          <IndentDraftButton value='decrease'>
            <FormatIndentDecrease />
          </IndentDraftButton>
        </ButtonGroup>
        <IconButton onClick={handleClick}>
          <ImageOutlined />
        </IconButton>
        <AtomicMediaModal
          open={open}
          onClose={handleClick}
        />
      </EditorToolbar>
      <Editor
        className={classes.editor}
        textAlignment={alignment}
        placeholder='Enter some text..'
      />
    </EditorContainer>
  );
}

export default LandingExample;