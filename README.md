<p align="center">
  <a href="https://draft-js-wysiwyg.com">
    <img width="150" src="https://draft-js-wysiwyg.com/static/logo.svg" alt="Draft-js-wysiwyg logo" />
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
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon
} from '@material-ui/icons';
import {
  Editor,
  EditorContainer,
  EditorToolbar,
  InlineToggleButton,
} from 'draft-js-wysiwyg';

const SimpleExample = () => (
  <EditorContainer>
    <EditorToolbar>
      <InlineToggleButton value='BOLD'>
        <FormatBoldIcon />
      </InlineToggleButton>
      <InlineToggleButton value='ITALIC'>
        <FormatItalicIcon />
      </InlineToggleButton>
    </EditorToolbar>
    <Editor />
  </EditorContainer>
);
```

## Documentation

**Components**

https://material-ui.com/components/toggle-button/

**Components API**

https://material-ui.com/api/toggle-button/
https://material-ui.com/api/toggle-button-group/
