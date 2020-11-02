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

## Block Type
<p class="sub-description">Block type toggle buttons can be used to allow the user to add new blocks in the editor.</p>

### Basic Example

{{"demo": "toggle-button/BasicExampleBlockType.jsx"}}

### Configuring block render map

Draft's default block render map can be overwritten by passing an [Immutable Map](https://web.archive.org/web/20150623131347/http://facebook.github.io:80/immutable-js/docs/#/Map) to the editor blockRender props.
[More info here](https://draftjs.org/docs/advanced-topics-custom-block-render-map)

{{"demo": "toggle-button/ConfiguringBlockRenderMap.jsx"}}

### Extend block render map

There are cases where instead of overriding the defaults, we only want to add new types of blocks. This can be done using the `blockRenderMapIsExpandable` property of the editor.

{{"demo": "toggle-button/ExtendBlockRenderMap.jsx"}}

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