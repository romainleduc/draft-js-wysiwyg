<p align="center">
  <a href="https://draft-js-wysiwyg.com">
    <img width="100" src="https://draft-js-wysiwyg.com/static/logo.svg" alt="Draft-js-wysiwyg logo" />
  </a>
</p>
<h1 align="center">
  Draft-js-wysiwyg
</h1>
<p align="center">
A Wysiwyg editor built using
  <a href="https://reactjs.org/">
    React
  </a>,
  <a href="https://draftjs.org">
    Draft
  </a>
  and
  <a href="https://material-ui.com/">
    Material-UI
  </a>
  libraries.
</p>
<p align="center">
  <a href="https://github.com/romainleduc/draft-js-wysiwyg/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
  </a>
  <a href="https://www.npmjs.com/package/draft-js-wysiwyg">
    <img src="https://img.shields.io/npm/v/draft-js-wysiwyg/latest.svg" alt="npm latest package" />
  </a>
    <a href="https://dependabot.com">
    <img src="https://api.dependabot.com/badges/status?host=github&repo=romainleduc/draft-js-wysiwyg" alt="Dependabot Status" />
  </a>
</p>

## Installation

Draft-js-wysiwyg is available as an [npm package](https://www.npmjs.com/package/draft-js-wysiwyg). You can install it using:

```sh
npm install draft-js-wysiwyg

#or
yarn add draft-js-wysiwyg
```

Please note that `draft-js-wysiwyg` depends on `draft-js`, `@material-ui/core` and `@material-ui/lab` which must also be installed.

## Usage

Here is a quick example to get you started.

```jsx
import React from 'react';
import {
  Editor,
  EditorContainer,
  EditorToolbar,
  BlockTypeToggleButton as ToggleButton,
  ToggleButtonGroup,
} from 'draft-js-wysiwyg';
import { EditorState, RichUtils } from 'draft-js';

const Example = () => {
  const [value, setValue] = React.useState('unstyled');
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  );

  const handleChange = (newEditorState) => {
    if (newEditorState) {
      setEditorState(newEditorState);
    }
  }

  const handleToggle = (_, newValue) => {
    setValue(newValue);
  }

  const handleClick = (_, newEditorState) => {
    setValue(RichUtils.getCurrentBlockType(newEditorState));
  }

  return (
    <EditorContainer
      editorState={editorState}
      onChangeEditorState={handleChange}
    >
      <EditorToolbar>
        <ToggleButtonGroup
          value={value}
          onChange={handleToggle}
          exclusive
        >
          <ToggleButton value="unstyled">
            Paragraph
          </ToggleButton>
          <ToggleButton value="header-one">
            H1
          </ToggleButton>
        </ToggleButtonGroup>
      </EditorToolbar>
      <Editor
        onClick={handleClick}
        placeholder='Enter some text..'
      />
    </EditorContainer>
  );
}

export default Example;
```

## Documentation

Check out our [documentation website](https://draft-js-wysiwyg.com).
