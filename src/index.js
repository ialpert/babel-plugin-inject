import * as plugins from "./plugins";
import {extname} from "path";


export default function ({ types: t }) {

    return {
        visitor: {
            CallExpression: function CallExpression(nodePath, state) {
                var node, value, fn, ext, res;
                node = nodePath.node;
                fn = state.opts.fn || 'inject';


                if (node.callee.name === fn && node['arguments'].length == 1) {
                    value = node['arguments'][0].value;
                    ext = extname(value).substr(1);

                    if (typeof  value === 'string' && value.length > 0) {

                        var args = {src: value, t: t, nodePath: nodePath, state: state};

                        if (plugins[value] !== undefined) {
                            nodePath.replaceWithSourceString(plugins[value](args));

                        } else if (typeof plugins[ext] === 'function') {

                            res = plugins[ext](args);

                            switch (typeof res) {
                                case 'function':
                                    nodePath.replaceWithSourceString(res);
                                    break;

                                default:
                                    nodePath.replaceWith(t.valueToNode(res));
                                    break;
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