import { combineReducers } from 'redux';

import selectedDrumkit from './selectedDrumkitReducer';
import selectedQuince from './selectedQuinceReducer';

import drumkits from '../drum-kits';
import quinces from '../quince-presets';

const tick = (prev = 0, { type }) => {
  switch (type) {
    case "TICK":
      return prev + 1;
    default:
      return prev;
  }
}

const toggleDrumkitDropdown = (active = false, { type }) => {
  switch (type) {
    case "TOGGLE_DRUMKIT_DROPDOWN":
      return !active;
    default:
      return active;
  }
}

const toggleHelp = (help = false, { type }) => {
  switch (type) {
    case "TOGGLE_HELP":
      return !help;
    default:
      return help;
  }
}

const toggleQuinceDropdown = (active = false, { type }) => {
  switch (type) {
    case "TOGGLE_QUINCE_DROPDOWN":
      return !active;
    default:
      return active;
  }
}

const togglePlaying = (playing = false, { type }) => {
  switch (type) {
    case "TOGGLE_PLAYING":
      return !playing;
    default:
      return playing;
  }
}

export default combineReducers({
  currentTick: tick,
  drumkits: _ => drumkits,
  drumkitDropdown: toggleDrumkitDropdown,
  help: toggleHelp,
  playing: togglePlaying,
  quinceDropdown: toggleQuinceDropdown,
  quinces: _ => quinces,
  samples: _ => ["kick", "snare", "hat-open", "hat-closed", "cymbal", "fx"],
  selectedDrumkit,
  selectedQuince,
});