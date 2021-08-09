---
title: Toggle Button React component
---

# Toggle Button

<p class="description">Toggle buttons can be used to group related options.</p>

***

## Inline
<p class="sub-description">Inline toggle buttons can be used to allow the user to modify styles within the editor.</p>

{{"api": "toggle-button/inline-toggle-button.md"}}

### Basic example

{{"demo": "toggle-button/SimpleExample.jsx"}}

### Extend styles

It is possible to add your own styles using the `customStyleMaps` property provided by `EditorProvider`. This will allow you to add multiple [inline style name maps](https://draftjs.org/docs/advanced-topics-inline-styles/#mapping-a-style-string-to-css) corresponding to the CSS style objects.

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

{{"api": "toggle-button/text-align-toggle-button.md"}}

### Align selection

{{"demo": "toggle-button/AlignSelection.jsx"}}

### Align all content

It is possible to ignore the selection so that the horizontal alignment is done on all the content.

{{"demo": "toggle-button/AlignAllContent.jsx"}}
