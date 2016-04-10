import {existsSync, readFileSync} from "fs";
import {resolve, dirname} from "path";

function txt(args) {
  let src = args.src;
  let state = args.state;

  src = resolve(dirname(state.file.opts.filename), src);

  if (src && existsSync(src)) {
    return readFileSync(src, 'utf8');
  }

  return args.src;
}

export {txt as txt};