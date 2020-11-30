---
title: Inline Toggle Button
---

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
| <span class="prop-name">disableKeyboardShortcuts</span> | <span class="prop-type">boolean</span> | <span class="prop-default">false</span> | If `true`, inline style will not be available from keyboard shortcuts. |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

#### Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

#### Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)
