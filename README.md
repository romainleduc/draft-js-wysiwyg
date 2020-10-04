<h1 align="center">draft-js-wysiwyg</h1>

<div align="center">

A Wysiwyg editor built using [React](https://reactjs.org/), [Draft](https://draftjs.org/) and [Material-UI](https://material-ui.com/) libraries.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KiziKr/draft-js-wysiwyg/blob/master/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/draft-js-wysiwyg/latest.svg)](https://www.npmjs.com/package/draft-js-wysiwyg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=KiziKr/draft-js-wysiwyg)](https://dependabot.com)

</div>

## Installation

Draft-js-wysiwyg is available as an [npm package](https://www.npmjs.com/package/draft-js-wysiwyg). 

**You can install it using:**

```sh
npm install draft-js-wysiwyg

#or
yarn add draft-js-wysiwyg
```

**You can install it and its required dependencies using:**

```sh
npm install draft-js-wysiwyg draft-js @material-ui/core @material-ui/lab

#or
yarn add draft-js-wysiwyg draft-js @material-ui/core @material-ui/lab
```

## Getting started

Easy to use example

```jsx
import { EditorContainer, EditorToolbar, TextAlignToggleButton } from 'draft-js-wysiwyg';
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@material-ui/icons';
import { ToggleButtonGroup } from '@material-ui/lab';

const ExempleEditorToolbar = (props) => {
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <EditorToolbar {...props}>
            <ToggleButtonGroup
                exclusive
                value={alignment}
                onChange={handleAlignment}
                size='small'
            >
                <TextAlignToggleButton value='left'>
                    <FormatAlignLeft />
                </TextAlignToggleButton>
                <TextAlignToggleButton value='center'>
                    <FormatAlignCenter />
                </TextAlignToggleButton>
                <TextAlignToggleButton value='right'>
                    <FormatAlignRight />
                </TextAlignToggleButton>
            </ToggleButtonGroup>
        </EditorToolbar>
    )
}

const ExempleEditor = (props) => (
    <EditorContainer
        editorToolbar={<ExempleToolbar/>}
    />
)
```

## Documentation

**Components**

https://material-ui.com/components/toggle-button/

**Components API**

https://material-ui.com/api/toggle-button/
https://material-ui.com/api/toggle-button-group/
