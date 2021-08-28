---
title: Button React component
---

# Button

<p class="description">Buttons can be used to group related options.</p>

***

## Atomic media

<p class="sub-description">Atomic image button can be used to allow the user to modify styles within the editor.</p>

{{"api": "toggle-button/inline-toggle-button.md"}}

### Embedded link
{{"demo": "button/AtomicMediaEmbed.jsx"}}

### Media library
Example of a media library that can be built from data collected from your database
{{"demo": "button/AtomicMediaLibrary.jsx"}}

### Disabled state

Make buttons look inactive by adding the `disabled` prop to.

{{"demo": "button/Validation.jsx"}}

<!-- ### Custom component

Within the `Editor` component, one may specify the `blockRendererFn` prop. This prop function allows a higher-level component to [define custom React rendering](https://draftjs.org/docs/advanced-topics-block-components) for `ContentBlock` objects, based on block type, text, or other criteria.

The `ContentBlock` object and the `ContentState` record are made available in the custom component, with the props set at the top level. By extracting the entity information from the `ContentBlock` and the `Entity` map, you can [get the required metadata](https://draftjs.org/docs/advanced-topics-block-components/#defining-custom-block-components) containing the props returned by `AtomicMediaButton` to render your custom component.

{{"demo": "button/CustomizedMedia.jsx"}} -->
