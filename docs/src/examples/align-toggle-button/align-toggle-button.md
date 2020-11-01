---
title: Text Align Toggle Button React component
---

# Text Align Toggle Button

<p class="description">Text Align Toggle buttons can be used to allow the user to modify horizontal alignment within the editor.</p>

## Align selection

{{"demo": "align-toggle-button/AlignSelection.jsx"}}

## Align all content

It is possible to ignore the selection so that the horizontal alignment is done on all the content.

{{"demo": "align-toggle-button/AlignAllContent.jsx"}}

***

## API

### Import

```js
import TextAlignToggleButton from 'draft-js-wysiwyg/TextAlignToggleButton';

// or
import { TextAlignToggleButton } from 'draft-js-wysiwyg';
```

### Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name required">value<abbr title="required">*</abbr></span> | <span class="prop-type">'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'justify'</span> |  | The horizontal alignment to associate with the button when selected in a ToggleButtonGroup. |
| <span class="prop-name">ignoreSelection</span> | <span class="prop-type">boolean</span> | <span class="prop-default">false</span> | If `true`, horizontal alignment will be performed on all content.  |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

### Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

### Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)