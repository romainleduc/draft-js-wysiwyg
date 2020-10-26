---
title: Inline Toggle Button React component
component: le comzdzdponent
link: materialui
---

# InlineToggleButton

<p class="description">The API documentation of the InlineToggleButton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import InlineToggleButton from 'draft-js-wysiwyg/InlineToggleButton';

// or
import { InlineToggleButton } from 'draft-js-wysiwyg';
```

## Component name

The `MuiToggleButton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name required">value<abbr title="required">*</abbr></span> | <span class="prop-type">string</span> |  | The value to associate with the button when selected in a ToggleButtonGroup. |

Any other props supplied will be provided to the root element ([ToggleButton](https://material-ui.com/api/toggle-button/)).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiToggleButton-root</span> | Styles applied to the root element.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">selected</span> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.
| <span class="prop-name">label</span> | <span class="prop-name">.MuiToggleButton-label</span> | Styles applied to the `label` wrapper element.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiToggleButton-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">sizeLarge</span> | <span class="prop-name">.MuiToggleButton-sizeLarge</span> | Styles applied to the root element if `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ToggleButton/ToggleButton.js) for more detail.

## Inheritance

The props of the [ToggleButton](https://material-ui.com/api/toggle-button/) component are also available.
You can take advantage of this behavior to [target nested components](https://material-ui.com/guides/api/#spread).

## Inheritance Demos

- [Toggle Button](https://material-ui.com/components/toggle-button/)

