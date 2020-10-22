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
import { FormatItalic, FormatBold } from '@material-ui/icons';
import { ToggleButtonGroup } from '@material-ui/lab';

const DraftEditor = () => {
    const [formats, setFormats] = useState(() => []);
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
                    {[
                        ['BOLD', <FormatBold />],
                        ['ITALIC', <FormatItalic />],
                        ['STRIKETHROUGH', <FormatStrikethrough />],
                        ['UNDERLINE', <FormatUnderlined />],
                        ['CODE', <Code />],
                    ].map(inline =>
                        <InlineToggleButton value={inline[0]}>
                            {inline[1]}
                        </InlineToggleButton>
                    )}
                </ToggleButtonGroup>
            </EditorToolbar>
            <Editor onChange={value => setHtml(value)} />
        </EditorContainer>
    );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/blissful-fast-rbujg)

## Documentation

**Components**

https://material-ui.com/components/toggle-button/

**Components API**

https://material-ui.com/api/toggle-button/
https://material-ui.com/api/toggle-button-group/
