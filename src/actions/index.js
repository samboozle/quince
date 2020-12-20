const addChannel = _ => ({ type: "ADD_CHANNEL" });

const addStepToChannel = channelIndex => {
  return {
    type: "ADD_STEP_TO_CHANNEL",
    payload: channelIndex
  }
}

const changeTempo = adjustment => ({
    type: "CHANGE_TEMPO",
    payload: adjustment
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

// thunkable
const selectDrumkit = name => {
  return (dispatch, getState) => {
    let { drumkits } = getState();
    let drumkit = drumkits[name];
    dispatch({
      type: "SELECT_DRUMKIT",
      payload: { name, drumkit }
    });
  }
}

// thunkable
const selectQuince = name => {
  return (dispatch, getState) => {
    let { quinces } = getState();
    let payload = quinces[name];
    dispatch({
      type: "SELECT_QUINCE",
      payload
    });
  }
}

const tick = _ => ({ type: "TICK" });

const toggleHelp = _ => ({ type: "TOGGLE_HELP" });

const togglePlaying = _ => ({ type: "TOGGLE_PLAYING" });

const toggleStep = (channelIndex, stepIndex) => {
  return {
    type: "TOGGLE_STEP",
    payload: {
      channelIndex,
      stepIndex
    }
  }
}

export {
  addChannel,
  addStepToChannel,
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