import {existsSync, readFileSync} from "fs";
import {resolve, dirname} from "path";
import * as _ from "lodash";

function txt(args) {
  var src = args.src;
  var state = args.state;

  src = resolve(dirname(state.file.opts.filename), src);
  if (existsSync(src)) {
    return readFileSync(src, 'utf8');
  }

  console.log('File not found: %s', src);
  return '';
}


function tpl() {
  _.extend(_.templateSettings, {variable: 'scope'});
  return _.template(txt.apply(this, arguments));
}


function injectCSS() {
  return function (css = '') {
    var s = document.createElement("style");
    s.innerHTML = css;

    document.querySelector('head').appendChild(s);
  }
}


export { txt };

export { txt as htm };
export { txt as html };
export { txt as css };

export { tpl };
export { injectCSS };