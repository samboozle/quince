const addChannel = _ => ({ type: "ADD_CHANNEL" });

const addStepToChannel = channelIndex => ({
  type: "ADD_STEP_TO_CHANNEL",
  payload: channelIndex
});

const changeSubdivision = offset => ({
  type: "CHANGE_SUBDIVISION",
  payload: offset
});

const changeTempo = offset => ({
  type: "CHANGE_TEMPO",
  payload: offset
});

// thunkable -- references global state :/
const cycleChannelSamples = (channelIndex, currentSample) => {
  return (dispatch, getState) => {
    let { samples } = getState();
    let sample = samples[samples.indexOf(currentSample) + 1] || "kick";
    return dispatch({
      type: "CYCLE_CHANNEL_SAMPLES",
      payload: {
        channelIndex,
        sample
      }
    });
  }
}

const removeChannel = channelIndex => {
  return {
    type: "REMOVE_CHANNEL",
    payload: channelIndex
  }
}

const removeStepFromChannel = channelIndex => {
  return {
    type: "REMOVE_STEP_FROM_CHANNEL",
    payload: channelIndex
  }
}

const selectDrumkit = name => ({
  type: "SELECT_DRUMKIT",
  payload: name
});

// thunkable
const selectQuince = name => {
  return (dispatch, getState) => {
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
}

const tick = _ => ({ type: "TICK" });

const toggleHelp = _ => ({ type: "TOGGLE_HELP" });

const togglePlaying = _ => ({ type: "TOGGLE_PLAYING" });

const toggleStep = (sample, stepIndex) => {
  return {
    type: "TOGGLE_STEP",
    payload: {
      sample,
      stepIndex
    }
  }
}

export {
  addChannel,
  addStepToChannel,
  changeSubdivision,
  changeTempo,
  cycleChannelSamples,
  removeChannel,
  removeStepFromChannel,
  selectDrumkit,
  selectQuince,
  tick,
  toggleHelp,
  togglePlaying,
  toggleStep
}