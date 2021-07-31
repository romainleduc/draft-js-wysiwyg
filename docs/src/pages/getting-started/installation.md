---
title: Inline Toggle Button
---

# Installation

<p class="description">Install Draft-JS-Wysiwyg, the editor designed for you.</p>

Draft-js-wysiwyg is available as an [npm package](https://www.npmjs.com/package/draft-js-wysiwyg). You can install it using:

## npm
To install and save in your `package.json` dependencies, run:

```js
// with npm
npm install draft-js-wysiwyg;

// with yarn
yarn add draft-js-wysiwyg;
```

Please note that [react](https://www.npmjs.com/package/react) >= 16.8.0, [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 and [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) are peer dependencies.

```js
// with npm
npm install draft-js-wysiwyg babel-polyfill

// with yarn
yarn add draft-js-wysiwyg es6-shim
```

Draft.js uses some modern ECMAScript features which are not available to IE11 and not part of create-react-app's default babel config. If you're running into problems out-of-the-box try installing a shim or polyfill alongside Draft.
Learn more about [using a shim with Draft](https://draftjs.org/docs/advanced-topics-issues-and-pitfalls#polyfills).
