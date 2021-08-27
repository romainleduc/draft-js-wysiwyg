import React from "react";
import {
  EditorContainer,
  Editor,
  EditorToolbar,
  AtomicMediaButton
} from "draft-js-wysiwyg";
import { EditorState } from "draft-js";
import {
  IconButton,
  Popover,
  makeStyles,
  TextField,
  Typography,
  Button
} from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  media: {
    width: '100%',
  },
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "15px 15px 0px 15px"
  }
}));

const AtomicMediaPopover = ({ onClose, ...other }) => {
  const [src, setSrc] = React.useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setSrc(event.target.value);
  };

  const handleClose = () => {
    setSrc("");
    onClose();
  };

  return (
    <Popover
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      {...other}
    >
      <div className={classes.paper}>
        <Typography className={classes.title} gutterBottom>
          Embed ULR
        </Typography>
        <TextField
          value={src}
          onChange={handleChange}
          variant="outlined"
          label="Enter link"
          size="small"
        />
        <div className={classes.actions}>
          <AtomicMediaButton
            color="primary"
            disabled={!Boolean(src)}
            atomicMediaProps={{
              src,
              height: 460,
              width: 1400,
            }}
            onInserted={handleClose}
            variant="outlined"
          >
            Add
          </AtomicMediaButton>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </Popover>
  );
};


const AtomicMediaEmbedExample = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <EditorContainer editorState={editorState} onChange={setEditorState}>
      <EditorToolbar>
        <IconButton onClick={handleClick}>
          <ImageOutlined />
        </IconButton>
        <AtomicMediaPopover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        />
      </EditorToolbar>
      <Editor placeholder="Enter some text.." />
    </EditorContainer>
  );
}

export default AtomicMediaEmbedExample;