# babel-plugin-inject [![Build Status][travis-image]][travis-url][![codecov.io][codecov-image]][codecov-url] [![Code Climate][codeclimate-image]][codeclimate-url]

[codecov-image]: https://codecov.io/github/ialpert/babel-plugin-inject/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/ialpert/babel-plugin-inject?branch=master
[travis-url]: http://travis-ci.org/ialpert/babel-plugin-inject
[travis-image]: http://travis-ci.org/ialpert/babel-plugin-inject.svg?branch=master

[codeclimate-image]: https://codeclimate.com/github/ialpert/babel-plugin-inject/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/ialpert/babel-plugin-inject

## Proposal

Plugin is useful in any case that requires to provide external asset or resource (mostly like css, html or txt files) 
to be used in your code. Any embedding task like building standalone pages, email newsletters or injectable widgets for the page.

**NPM Package:** https://www.npmjs.com/package/babel-plugin-inject

## Usage Example 


```javascript
import Widget from './widgetClass.js';


(function (template1Html, template2Html, style1Css, style2Css) {

  class Widget1 extends Widget {

    constructor(options) {
      super(options);
    }

    method1() {

    }
  }


  var w = new Widget1();

  w.method1();


})(
  inject('./static1.htm'),
  inject('./template2.tpl'),  // To be preprocessed
  inject('./style1.css'),
  inject('./style2.sass') // To be preprocessed
);
```

```javascript
let injectCss = inject('injectCSS');
injectCSS('body{color:red}');
```

## Plugins

1. *txt* Simple plain text injection, used as a base for other content driven plugins
2. *htm*, *html* Placeholder for HTML injection. At this moment do nothing more then *txt* Could be extended to minify/optimize html
3. *tpl* Compile HTML to Lodash completable template and provides temperating function


### Helpers

1. *injectCSS* inserts provided CSS to document


## Installation

```sh
$ npm install babel-plugin-inject --save
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-inject"]
}
```

### Via CLI

```sh
$ babel --plugins babel-plugin-inject script.js
```

### Via Node API

```javascript
require("babel-core").transform('source code', {
  plugins: ['babel-plugin-inject']
});
```

### No Conflict

We use another name for our function not to mess with existing inject() if any:

```javascript
require("babel-core").transform('source code', {
  plugins: [['babel-plugin-inject', {fn: 'inject2'}]]
});
```

```javascript
let injectCss = inject2('injectCSS');
injectCSS('body{color:red}');
```
