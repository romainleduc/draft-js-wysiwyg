import React, { useState } from 'react';
import { ToggleButtonGroup as DraftToggleButtonGroup, EditorContainer, EditorProvider, EditorToolbar, Editor, AtomicMediaButton, InlineToggleButton, BlockTypeToggleButton, TextAlignToggleButton, IndentDraftButton, SelectMenu } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, GridList, GridListTile, alpha, Divider, withStyles, ButtonGroup as MuiButtonGroup, Tabs, Tab, Box } from '@material-ui/core';
import { Code, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatBold, FormatIndentDecrease, FormatIndentIncrease, FormatItalic, FormatListBulleted, FormatListNumbered, FormatStrikethrough, FormatUnderlined, ImageOutlined, PlayArrowRounded, Colorize } from '@material-ui/icons';
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
    border: `solid 1px ${alpha('#000', .7)}`,
    padding: theme.spacing(2),
    outline: 0,
  },
  media: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: `solid 1px ${alpha('#000', .6)}`,
    width: '100%',
    height: '100%',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  toolbar: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    flexWrap: 'wrap',
    padding: 4,
    backgroundColor: '#ccd5df57',
  },
  editor: {
    border: `1px solid ${theme.palette.divider}`,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    padding: 40,
    borderTop: 0,
    minHeight: 141,
    '& .DraftEditor-editorContainer': {
      maxHeight: 'min(68vh, 600px)',
      overflowY: 'auto',
    },
  },
  select: {
    marginRight: 5,
  },
  menuButton: {
    backgroundColor: '#fff',
    // color: 'rgb(0 0 0 / 75%)',
    margin: theme.spacing(0.5),
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

const customStyleMaps = [
  {
    group: 'FONT_FAMILY',
    exclusive: true,
    styles: {
      ROBOTO: {
        fontFamily: '"Roboto", sans-serif',
      },
      DANCING: {
        fontFamily: '"Dancing Script", cursive',
      },
      UBUNTU: {
        fontFamily: '"Ubuntu", sans-serif',
      },
    }
  },
  {
    group: 'FONT_SIZE',
    exclusive: true,
    styles: {
      SMALL: { fontSize: 10 },
      MEDIUM: { fontSize: 15 },
      LARGE: { fontSize: 30 },
    }
  },
  {
    group: 'COLOR',
    exclusive: true,
    styles: {
      RED: { color: 'rgba(255, 0, 0, 1.0)' },
      ORANGE: { color: 'rgba(255, 127, 0, 1.0)' },
      YELLOW: { color: 'rgba(180, 180, 0, 1.0)' },
    }
  },
];

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
    <EditorProvider customStyleMaps={customStyleMaps}>
      <EditorContainer
        noSsr
        editorState={editorState}
        onChange={setEditorState}
      >
        <EditorToolbar className={classes.toolbar}>
          <SelectMenu
            className={classes.select}
            buttonProps={{
              className: classes.menuButton,
            }}
            exclusive
            minWidth={130}
            size="small"
            type="blockType"
            choices={[
              {
                label: 'Paragraph',
                value: 'unstyled',
              },
              {
                label: 'H1',
                value: 'header-one',
              },
              {
                label: 'H2',
                value: 'header-two',
              },
              {
                label: 'H3',
                value: 'header-three',
              },
              {
                label: 'H4',
                value: 'header-four',
              },
              {
                label: 'H5',
                value: 'header-five',
              },
              {
                label: 'H6',
                value: 'header-six',
              },
              {
                label: 'Blockquote',
                value: 'blockquote',
              },
              {
                label: 'Code Block',
                value: 'code-block',
              },
            ]}
          />
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
          <SelectMenu
            className={classes.select}
            buttonProps={{
              className: classes.menuButton,
            }}
            exclusive
            minWidth={130}
            label="Font family"
            size="small"
            type="inline"
            choices={[
              {
                label: 'Roboto',
                value: 'FONT_FAMILY_ROBOTO',
              },
              {
                label: 'Dancing',
                value: 'FONT_FAMILY_DANCING',
              },
              {
                label: 'Ubuntu',
                value: 'FONT_FAMILY_UBUNTU',
              },
            ]}
          />
          <SelectMenu
            className={classes.select}
            buttonProps={{
              className: classes.menuButton,
            }}
            exclusive
            label="Size"
            size="small"
            type="inline"
            choices={[
              {
                label: 'Small',
                value: 'FONT_SIZE_SMALL',
              },
              {
                label: 'Medium',
                value: 'FONT_SIZE_MEDIUM',
              },
              {
                label: 'Large',
                value: 'FONT_SIZE_LARGE',
              },
            ]}
          />
          <SelectMenu
            className={classes.select}
            buttonProps={{
              className: classes.menuButton,
            }}
            exclusive
            label={<Colorize />}
            size="small"
            type="inline"
            choices={[
              {
                label: 'Red',
                value: 'COLOR_RED',
              },
              {
                label: 'Orange',
                value: 'COLOR_ORANGE',
              },
              {
                label: 'Yellow',
                value: 'COLOR_YELLOW',
              },
            ]}
          />
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
          <Divider flexItem orientation="vertical" className={classes.divider} />
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
          placeholder='Enter some text..'
        />
      </EditorContainer>
    </EditorProvider>
  );
}

export default LandingExample;