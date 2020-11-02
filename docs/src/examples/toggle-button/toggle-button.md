---
title: Toggle Button React component
---

# Toggle Button

<p class="description">Toggle buttons can be used to group related options.</p>

***

## Inline
<p class="sub-description">Inline toggle buttons can be used to allow the user to modify styles within the editor.</p>

### Basic example

{{"demo": "toggle-button/SimpleExample.jsx"}}

### Extend styles

It is possible to add your own styles using the `customStyleMap` property provided by [Draft.js](https://draftjs.org/docs/advanced-topics-inline-styles/). This will allow you to add an inline style name map corresponding to the CSS style objects.

{{"demo": "toggle-button/ExtendStyle.jsx"}}

***

## Block render

{{"demo": "toggle-button/BlockRender.jsx"}}

***

## Text Align
<p class="sub-description">Text align toggle buttons can be used to allow the user to modify horizontal alignment within the editor.</p>

### Align selection

{{"demo": "toggle-button/AlignSelection.jsx"}}

### Align all content

It is possible to ignore the selection so that the horizontal alignment is done on all the content.

{{"demo": "toggle-button/AlignAllContent.jsx"}}

***

## API

### Inline

#### Import

```js
import InlineToggleButton from 'draft-js-wysiwyg/InlineToggleButton';

// or
import { InlineToggleButton } from 'draft-js-wysiwyg';
```

#### Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name required">value<abbr title="required">*</abbr></span> | <span class="prop-type">string</span> |  | The inline style to associate with the button when selected in a ToggleButtonGroup. |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

#### Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

#### Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)

### Text Align

#### Import

```js
import TextAlignToggleButton from 'draft-js-wysiwyg/TextAlignToggleButton';

// or
import { TextAlignToggleButton } from 'draft-js-wysiwyg';
```

#### Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name required">value<abbr title="required">*</abbr></span> | <span class="prop-type">'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'justify'</span> |  | The horizontal alignment to associate with the button when selected in a ToggleButtonGroup. |
| <span class="prop-name">ignoreSelection</span> | <span class="prop-type">boolean</span> | <span class="prop-default">false</span> | If `true`, horizontal alignment will be performed on all content.  |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

#### Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

#### Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)