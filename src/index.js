import glob from 'glob';
import {each, extend, isString, isFunction} from 'lodash';
import {resolve, dirname, join, basename, extname} from "path";

export default function ({ types: t }) {


  let plugins = {};


  glob(join(__dirname, 'plugins', '*.js'), {}, function (err, files) {
    each(files, (plugin) => {
      extend(plugins, require(plugin));
    });
  });

  return {
    visitor: {
      CallExpression: (nodePath, state) => {
        let node = nodePath.node;
        let fn = state.opts.fn || 'inject';


        if (node.callee.name === fn && node['arguments'].length == 1) {
          let value = node['arguments'][0].value;
          let ext = extname(value).substr(1);

          if (isString(value)) {

            let args = {src: value, t: t, nodePath: nodePath, state: state};

            if (plugins[value] !== undefined) {
              nodePath.replaceWithSourceString(plugins[value](args));

            } else if (isFunction(plugins[ext])) {

              let res = plugins[ext](args);

              if (typeof res === 'function') {
                nodePath.replaceWithSourceString(res);
              } else {
                nodePath.replaceWith(t.valueToNode(res));
              }

            } else {
              nodePath.replaceWith(t.nullLiteral());
            }
          }
        }
      }
    }
  };
}