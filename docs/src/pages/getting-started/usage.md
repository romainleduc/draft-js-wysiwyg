---
title: Inline Toggle Button
---

# Usage

<p class="description">Get started with React and Draft-JS-Wysiwyg in no time.</p>

## Quick start

Here is a very basic example to get you started, **it's literally all you need**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  EditorContainer,
  Editor,
  ToggleButton,
  EditorToolbar,
  ToggleButtonGroup,
} from 'draft-js-wysiwyg';
import { EditorState } from 'draft-js';
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon
} from '@material-ui/icons';
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
      <EditorToolbar>
        <ToggleButtonGroup size="small">
          <ToggleButton value="BOLD">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="ITALIC">
            <FormatItalicIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor ref={editor} placeholder="Enter some text.." />
    </EditorContainer>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

You can see this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/usage-zlf3t)

## Globals

Because Draft.js supports unicode, you must have the following meta tag in the <head></head> block of your HTML file:

```jsx
<meta charset="utf-8" />
```

Draft.css should be included when rendering the editor. Learn more about [why](https://draftjs.org/docs/advanced-topics-issues-and-pitfalls#missing-draftcss).