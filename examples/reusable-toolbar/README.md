# Reusable toolbar

## How to use

[Clone the repo](https://github.com/romainleduc/draft-js-wysiwyg) and run:

```sh
npm install
npm start
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reusable-toolbar-r1x16)

## The idea behind the example

This example demonstrates how to create a reusable toolbar anywhere in your application by specifying only the items you need.

```jsx
<MyEditorToolbar
  blockType={[
    'unstyled',
    'header-one',
    'header-two',
    'header-three',
    'blockquote',
    'code-block'
  ]}
  inline
  align
  list
  isToggleMenu={['blockType']}
/>
```
