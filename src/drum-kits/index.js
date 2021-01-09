import * as crash from './crash.json';
import * as hatClosed from './hat-cl.json';
import * as hatOpen from './hat-op.json';
import * as kick from './kick.json';
import * as misc from './misc.json';
import * as snareAlt from './snare-alt.json';
import * as snare from './snare.json';
import * as tomHi from './tom-hi.json';
import * as tomLo from './tom-lo.json';

import { makeHowl } from '../helpers';

export default [
  kick, snare, snareAlt,
  hatOpen, hatClosed, crash,
  tomHi, tomLo, misc
]
.map(obj => obj.default)
.reduce((acc, drumkit) => {
  acc[drumkit.name] = makeHowl(drumkit);
  return acc;
}, {});
