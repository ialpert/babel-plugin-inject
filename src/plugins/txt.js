import {existsSync, readFileSync} from "fs";
import {resolve, dirname} from "path";

function txt(args) {
  let src = args.src;
  let state = args.state;

  src = resolve(dirname(state.file.opts.filename), src);

  if (existsSync(src)) {
    return readFileSync(src, 'utf8');
  }

  console.log('File not found: %s', src);
  return '';
}

export {txt as txt};