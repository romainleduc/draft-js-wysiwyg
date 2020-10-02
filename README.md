# draft-js-wysiwyg
A wysiwyg on top of DraftJS.

## Installation

draft-js-wysiwyg is available from npm. You can install it (and its required dependencies) using:

```sh
npm instal draft-js-wysiwyg

#or
yarn add draft-js-wysiwyg
```

## Getting started

Easy to use example

```jsx
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
