---
title: Inline Toggle Button React component
component: le comzdzdponent
link: materialui
---

# Inline Toggle Button

<p class="description">Toggle buttons can be used to allow the user to modify styles within the editor.</p>

## Basic example

{{"demo": "inline-toggle-button/SimpleExample.jsx"}}

## Custom style

It is possible to add your own styles using the `customStyleMap` property provided by [Draft.js](https://draftjs.org/docs/advanced-topics-inline-styles/). This will allow you to add an inline style name map corresponding to the CSS style objects.

{{"demo": "inline-toggle-button/CustomExample.jsx"}}

***

## API

### Import

```js
import InlineToggleButton from 'draft-js-wysiwyg/InlineToggleButton';

// or
import { InlineToggleButton } from 'draft-js-wysiwyg';
```

### Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name required">value<abbr title="required">*</abbr></span> | <span class="prop-type">string</span> |  | The value to associate with the button when selected in a ToggleButtonGroup. |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

### Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

### Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)