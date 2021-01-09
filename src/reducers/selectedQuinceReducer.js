import quinces from '../quince-presets';
import { intersperseSubdivisions } from '../helpers';

export default (selectedQuince = quinces["Empty Quince"], { type, payload }) => {

  const { subdivision } = selectedQuince;

  switch (type) {
    case "ADD_BEAT_TO_CHANNEL":
      return {
        ...selectedQuince,
        channels: {
          ...selectedQuince.channels,
          [ payload.sample ]: selectedQuince.channels[ payload.sample ].concat(Array.from({ length: payload.subdivision }, _ => 0))
        }
      }
    case "ADD_BEAT_TO_STRING":
      return {
        ...selectedQuince,
        guitar: {
          ...selectedQuince.guitar,
          [ payload.sample ]: selectedQuince.guitar[ payload.sample ].concat(Array.from({ length: payload.subdivision }, _ => null))
        }
      }
    case "ADD_STEP_TO_CHANNEL":
      return {
        ...selectedQuince,
        channels: {
          ...selectedQuince.channels,
          [ payload ]: [...selectedQuince.channels[ payload ], 0]
        }
      }
    case "ADD_STEP_TO_STRING":
      return {
        ...selectedQuince,
        guitar: {
          ...selectedQuince.guitar,
          [ payload ]: [...selectedQuince.guitar[ payload ], null]
        }
      }
    case "CHANGE_SUBDIVISION":
      return {
        ...selectedQuince,
        subdivision: Math.max(subdivision + payload.offset, 1),
        channels: payload.intersperse
          ? intersperseSubdivisions(selectedQuince.channels, subdivision, payload.offset, 0)
          : { ...selectedQuince.channels },
        guitar: payload.intersperse
          ? intersperseSubdivisions(selectedQuince.guitar, subdivision, payload.offset, null)
          : { ...selectedQuince.guitar }
      }
    case "CHANGE_TEMPO":
      return {
        ...selectedQuince,
        tempo: Math.max(selectedQuince.tempo + payload, 1)
      }
    // case "CYCLE_CHANNEL_SAMPLES":
    //   return {
    //     ...selectedQuince,
    //     channels: [...selectedQuince.channels.reduce((acc, channel, chIdx) => {
    //       return chIdx === payload.channelIndex
    //         ? [...acc, { ...channel, sample: payload.sample }]
    //         : [...acc, channel]
    //     }, [])]
    //   }
    case "REMOVE_BEAT_FROM_CHANNEL":
      return {
        ...selectedQuince,
        channels: {
          ...selectedQuince.channels,
          [ payload.sample ]: selectedQuince.channels[ payload.sample ].slice(0, selectedQuince.channels[ payload.sample ].length - payload.subdivision)
        }
      }
    case "REMOVE_BEAT_FROM_STRING":
      return {
        ...selectedQuince,
        guitar: {
          ...selectedQuince.guitar,
          [ payload.sample ]: selectedQuince.guitar[ payload.sample ].slice(0, selectedQuince.guitar[ payload.sample ].length - payload.subdivision)
        }
      }
    case "REMOVE_STEP_FROM_CHANNEL":
      return {
        ...selectedQuince,
        channels: {
          ...selectedQuince.channels,
          [ payload ]: selectedQuince.channels[ payload ].slice(0, selectedQuince.channels[ payload ].length - 1)
        }
      }
    case "REMOVE_STEP_FROM_STRING":
      return {
        ...selectedQuince,
        guitar: {
          ...selectedQuince.guitar,
          [ payload ]: selectedQuince.guitar[ payload ].slice(0, selectedQuince.guitar[ payload ].length - 1)
        }
      }
    case "SELECT_QUINCE":
      return payload;
    case "TOGGLE_STEP":
      return {
        ...selectedQuince,
        channels: {
          ...selectedQuince.channels,
          [ payload.sample ]: selectedQuince.channels[ payload.sample ]
                              .reduce((stAcc, step, stIdx) => {
            let toggle = stIdx === payload.stepIndex;
            return step && toggle
              ? [...stAcc, 0]
              : toggle
                ? [...stAcc, 1]
                : [...stAcc, step];
          }, [])
        }
      }
    default:
      return selectedQuince;
  }
}
