## draft-js-wysiwyg ##

A Wysiwyg editor built using [React](https://reactjs.org/), [Draft](https://draftjs.org/) and [Material-UI](https://material-ui.com/) libraries.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KiziKr/draft-js-wysiwyg/blob/master/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/draft-js-wysiwyg/latest.svg)](https://www.npmjs.com/package/draft-js-wysiwyg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=KiziKr/draft-js-wysiwyg)](https://dependabot.com)

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
import { Editor, EditorContainer, EditorToolbar, InlineToggleButton } from 'draft-js-wysiwyg';
import { ToggleButtonGroup } from '@material-ui/lab';

const DraftEditor = () => {
    const [formats, setFormats] = useState(() => ['BOLD']);
    const [html, setHtml] = useState('');

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    return (
        <EditorContainer>
            <EditorToolbar>
                <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    size='small'
                >
                    <InlineToggleButton value='BOLD'>Bold</InlineToggleButton>
                    <InlineToggleButton value='ITALIC'>Italic</InlineToggleButton>
                </ToggleButtonGroup>
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
