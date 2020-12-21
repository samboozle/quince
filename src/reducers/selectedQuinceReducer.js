import quinces from '../quince-presets';

export default (selectedQuince = quinces["Fifteen Step"], { type, payload }) => {
  switch (type) {
    case "ADD_CHANNEL":
      return {
        ...selectedQuince,
        channels: [...selectedQuince.channels, { sample: "kick", steps: [] }]
      }
    case "ADD_STEP_TO_CHANNEL":
      return {
        ...selectedQuince,
        channels: selectedQuince.channels.reduce((acc, channel, chIdx) => {
          return chIdx === payload
            ? [...acc, { ...channel, steps: [...channel.steps, 0] }]
            : [...acc, channel];
        }, [])
      }
    case "CHANGE_TEMPO":
      return {
        ...selectedQuince,
        tempo: Math.max(selectedQuince.tempo + payload, 1)
      }
    case "CYCLE_CHANNEL_SAMPLES":
      return {
        ...selectedQuince,
        channels: [...selectedQuince.channels.reduce((acc, channel, chIdx) => {
          return chIdx === payload.channelIndex
            ? [...acc, { ...channel, sample: payload.sample }]
            : [...acc, channel]
        }, [])]
      }
    case "REMOVE_CHANNEL":
      return {
        ...selectedQuince,
        channels: selectedQuince.channels.filter((_, index) => index !== payload)
      }
    case "REMOVE_STEP_FROM_CHANNEL":
      return {
        ...selectedQuince,
        channels: selectedQuince.channels.reduce((acc, channel, chIdx) => {
          return chIdx === payload
            ? [...acc, { ...channel, steps: channel.steps.slice(0, channel.steps.length - 1) }]
            : [...acc, channel]
        }, [])
      };
    case "SELECT_QUINCE":
      return payload;
    case "TOGGLE_STEP":
      return {
        ...selectedQuince,
        channels: selectedQuince.channels.reduce((chAcc, channel, chIdx) => {
          return chIdx === payload.channelIndex
            ? [...chAcc, {
                ...channel,
                steps: channel.steps.reduce((stAcc, step, stIdx) => {
                  let toggle = stIdx === payload.stepIndex;
                  return step && toggle
                    ? [...stAcc, 0]
                    : toggle
                      ? [...stAcc, 1]
                      : [...stAcc, step];
                }, [])
              }]
            : [...chAcc, channel];
        }, [])
      }
    default:
      return selectedQuince;
  }
}