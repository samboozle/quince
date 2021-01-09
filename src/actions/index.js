// thunkable
const addBeatToChannel = sample => (dispatch, getState) => {
  let { subdivision } = getState().selectedQuince;
  dispatch({
    type: "ADD_BEAT_TO_CHANNEL",
    payload: { sample, subdivision }
  });
}

// thunkable
const addBeatToString = sample => (dispatch, getState) => {
  let { subdivision } = getState().selectedQuince;
  dispatch({
    type: "ADD_BEAT_TO_STRING",
    payload: { sample, subdivision }
  });
}

const addStepToChannel = sample => ({
  type: "ADD_STEP_TO_CHANNEL",
  payload: sample
});

const addStepToString = sample => ({
  type: "ADD_STEP_TO_STRING",
  payload: sample
});

const changeSubdivision = offset => (dispatch, getState) => {
  let { intersperse } = getState();
  dispatch({
    type: "CHANGE_SUBDIVISION",
    payload: {
      intersperse,
      offset
    }
  });
};

const changeTempo = offset => ({
  type: "CHANGE_TEMPO",
  payload: offset
});

// thunkable
// const cycleChannelSamples = (channelIndex, currentSample) => (dispatch, getState) => {
//   let { samples } = getState();
//   let sample = samples[samples.indexOf(currentSample) + 1] || "kick";
//   return dispatch({
//     type: "CYCLE_CHANNEL_SAMPLES",
//     payload: {
//       channelIndex,
//       sample
//     }
//   });
// }

// thunkable
const removeBeatFromChannel = sample => (dispatch, getState) => {
  let { subdivision } = getState().selectedQuince;
  dispatch({
    type: "REMOVE_BEAT_FROM_CHANNEL",
    payload: { sample, subdivision }
  });
}

// thunkable
const removeBeatFromString = sample => (dispatch, getState) => {
  let { subdivision } = getState().selectedQuince;
  dispatch({
    type: "REMOVE_BEAT_FROM_STRING",
    payload: { sample, subdivision }
  });
}

const removeStepFromChannel = sample => ({
  type: "REMOVE_STEP_FROM_CHANNEL",
  payload: sample
});

const removeStepFromString = sample => ({
  type: "REMOVE_STEP_FROM_STRING",
  payload: sample
});

const selectDrumkit = name => ({
  type: "SELECT_DRUMKIT",
  payload: name
});

// thunkable
const selectQuince = name => (dispatch, getState) => {
  let { quinces } = getState();
  let quince = quinces[name];
  let { defaultKit } = quince;
  dispatch({
    type: "SELECT_QUINCE",
    payload: quince
  });
  dispatch({
    type: "SELECT_DRUMKIT",
    payload: defaultKit
  });
}

const setFret = (sample, stepIndex, fret) => ({
  type: "SET_FRET",
  payload: {
    fret,
    sample,
    stepIndex
  }
});

const tick = _ => ({ type: "TICK" });

const toggleHelp = _ => ({ type: "TOGGLE_HELP" });

const togglePlaying = _ => ({ type: "TOGGLE_PLAYING" });

const toggleStep = (sample, stepIndex) => ({
  type: "TOGGLE_STEP",
  payload: {
    sample,
    stepIndex
  }
});

export {
  addBeatToChannel,
  addBeatToString,
  // addChannel,
  addStepToChannel,
  addStepToString,
  changeSubdivision,
  changeTempo,
  // cycleChannelSamples,
  removeBeatFromChannel,
  removeBeatFromString,
  // removeChannel,
  removeStepFromChannel,
  removeStepFromString,
  selectDrumkit,
  selectQuince,
  setFret,
  tick,
  toggleHelp,
  togglePlaying,
  toggleStep
}