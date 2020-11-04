## draft-js-wysiwyg ##

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

Please note that `draft-js-wysiwyg` depends on `@material-ui/core` and `@material-ui/lab` which must also be installed.

## Usage

Here is a quick example to get you started.

```jsx
import React, { useState } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import {
    Editor,
    EditorContainer,
    EditorToolbar,
    InlineToggleButton,
} from 'draft-js-wysiwyg';

const DraftEditor = () => {
    const [html, setHtml] = useState('');

    return (
        <EditorContainer>
            <EditorToolbar>
                <InlineToggleButton value='BOLD'>
                    <FormatBoldIcon />
                </InlineToggleButton>
            </EditorToolbar>
            <Editor onChange={value => setHtml(value)} />
        </EditorContainer>
    );
}
```

## Documentation

**Components**

https://material-ui.com/components/toggle-button/

**Components API**

https://material-ui.com/api/toggle-button/
https://material-ui.com/api/toggle-button-group/
