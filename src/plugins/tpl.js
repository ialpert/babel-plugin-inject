import {txt} from './txt';
import * as _ from 'lodash';

function tpl() {
  _.extend(_.templateSettings, {variable: 'scope'});
  return _.template(txt.apply(this, arguments));
}

export {tpl};