import * as A from './A.json';
import * as B from './B.json';
import * as D from './D.json';
import * as E from './E.json';
import * as e from './e1.json';
import * as G from './G.json';

import { makeHowl } from '../helpers';

export default [
  e, B, G, D, A, E
]
.map(obj => obj.default)
.reduce((acc, drumkit) => {
  acc[drumkit.name] = makeHowl(drumkit);
  return acc;
}, {});
