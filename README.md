<div>
  <a href='https://draft-js-wysiwyg.com'>
    <img src='https://draft-js-wysiwyg.com/static/logo.png' alt='Draft-js-wysiwyg logo' />
  </a>
  <h1>Draft-js-wysiwyg</h1>
</div>

A Wysiwyg editor built using [React](https://reactjs.org/), [Draft](https://draftjs.org/) and [Material-UI](https://material-ui.com/) libraries.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/romainleduc/draft-js-wysiwyg/blob/master/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/draft-js-wysiwyg/latest.svg)](https://www.npmjs.com/package/draft-js-wysiwyg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=romainleduc/draft-js-wysiwyg)](https://dependabot.com)

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
