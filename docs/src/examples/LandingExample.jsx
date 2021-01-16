import React, { useState } from 'react';
import { DraftToggleButtonGroup, EditorContainer, EditorToolbar, Editor, AtomicImageButton, InlineToggleButton, BlockTypeToggleButton, TextAlignToggleButton, IndentDraftButton } from 'draft-js-wysiwyg';
import { makeStyles, Modal, IconButton, Tooltip, Box, Typography, GridList, GridListTile, fade, Divider, withStyles, FormControl, Select as MuiSelect, MenuItem, InputBase, ButtonGroup as MuiButtonGroup, Button } from '@material-ui/core';
import { Code, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatBold, FormatIndentDecrease, FormatIndentIncrease, FormatItalic, FormatListBulleted, FormatListNumbered, FormatStrikethrough, FormatUnderlined, ImageOutlined, List } from '@material-ui/icons';
import imageData from './components/button/imageData';

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

const BootstrapInput = withStyles((theme) => ({
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
}))(InputBase);

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
    padding: 5,
    borderTop: 0,
    minHeight: 141,
    '& .DraftEditor-editorContainer': {
      maxHeight: 'min(68vh, 600px)',
      overflowY: 'auto',
    },
  }
})));

const InlineToggleButtonGroup = () => {
  const [formats, setFormats] = useState(() => []);

  const handleFormat = (_, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      size='small'
    >
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
  )
}

const BlockTypeToggleButtonSelect = () => {
  const [blockType, setBlockType] = React.useState('header-two');

  const handleChange = (event) => {
    setBlockType(event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={blockType}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
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
        ].map((block, key) =>
          <BlockTypeToggleButton
            key={`block-type-${key}`}
            component={StyledMenuItem}
            key={`basic-block-${block[0]}`}
            value={block[0]}
          >
            {block[1]}
          </BlockTypeToggleButton>
        )}
      </Select>
    </FormControl>
  )
}


const ListToggleButtonGroup = () => {
  const [blockType, setBlockType] = useState('');

  const handleBlockType = (_, newBlockType) => {
    setBlockType(newBlockType);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={blockType}
      onChange={handleBlockType}
      size='small'
    >
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
  )
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

  return (
    <Modal
      className={classes.modal}
      {...props}
    >
      <div className={classes.paper}>
        <Typography variant='h2'>Image</Typography>
        <Box p={3}>
          <GridList
            className={classes.gridList}
            spacing={10}
            cellHeight={140}
            cols={3}
          >
            {imageData.map(({ background, tooltip, src }, key) => (
              <GridListTile key={`grid-list-tile-${key}`}>
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

const LandingExample = () => {
  const [open, setOpen] = React.useState(false);
  const [alignment, setAlignment] = useState('left');
  const classes = useStyles();

  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment)
  }

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <EditorContainer noSsr>
      <EditorToolbar className={classes.toolbar}>
        <BlockTypeToggleButtonSelect />
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <InlineToggleButtonGroup />
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ToggleButtonGroup
          exclusive
          value={alignment}
          onChange={handleAlignment}
          size='small'
        >
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
        <ListToggleButtonGroup />
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
        <EditorModal
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