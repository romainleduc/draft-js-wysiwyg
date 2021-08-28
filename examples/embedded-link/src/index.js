import React from "react";
import ReactDOM from "react-dom";
import { EditorContainer, Editor, EditorToolbar } from "draft-js-wysiwyg";
import { EditorState } from "draft-js";
import { IconButton } from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";
import AtomicMediaPopover from "./AtomicMediaPopover";
import "draft-js/dist/Draft.css";

const App = () => {
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
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
