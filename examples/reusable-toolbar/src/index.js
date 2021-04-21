import React from 'react';
import ReactDOM from 'react-dom';
import {
  EditorContainer,
  Editor,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';
import MyEditorToolbar from './MyEditorToolbar';
import 'draft-js/dist/Draft.css';

const App = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  );
  const editor = React.useRef(null);

  React.useEffect(() => {
    editor.current.focus();
  }, []);

  return (
    <EditorContainer
      editorState={editorState}
      onChange={setEditorState}
    >
      <MyEditorToolbar
        blockType={[
          'unstyled',
          'header-one',
          'header-two',
          'header-three',
          'blockquote',
          'code-block'
        ]}
        indent
        inline
        align
        list
        isToggleMenu={['blockType']}
      />
      <Editor ref={editor} placeholder='Enter some text..' />
    </EditorContainer>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
