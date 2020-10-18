import React, { useEffect, useReducer } from 'react';

import { Navbar, Sequence, Transport } from './components';
import { acoustic, electro, vinyl } from './drum-kits';
import { bootsAndCats, emptyQuince, fifteenStep } from './quince-presets';

export default _ => {
  const drumKits = [ acoustic, electro, vinyl ];
  const presetQuinces = [ bootsAndCats, emptyQuince, fifteenStep ];
  const samples = [ "kick", "snare", "hat-closed", "hat-open", "cymbal", "fx" ];

  const reducer = (state, { msg, payload }) => {
    let { playing, selectedQuince } = state;
    switch (msg) {
      case "ADD_CHANNEL":
        return {
          ...state,
          selectedQuince: {
            ...selectedQuince,
            channels: [ ...selectedQuince.channels, { sample: "kick", steps: [] } ]
          }
        }
      case "ADD_STEP_TO_CHANNEL":
        return {
            ...state,
            selectedQuince: {
              ...selectedQuince,
              channels: selectedQuince.channels.reduce((acc, channel, chIdx) => {
                return chIdx === payload 
                  ? [ ...acc, { ...channel, steps: [ ...channel.steps, 0 ] } ]
                  : [ ...acc, channel ];
              }, [])
            }
        }
      case "CYCLE_CHANNEL_SAMPLES":
        let sample = samples[samples.indexOf(payload.sample) + 1] || "kick";
        return {
          ...state,
          selectedQuince: {
            ...selectedQuince,
            channels: [ ...selectedQuince.channels.reduce((acc, channel, chIdx) => {
              return chIdx === payload.chIdx
                ? [ ...acc, { ...channel, sample } ]
                : [ ...acc, channel ]
            }, []) ]
          }
        };
      case "CHANGE_TEMPO":
        return {
          ...state,
          selectedQuince: { ...selectedQuince, tempo: selectedQuince.tempo + payload }
        };
        case "REMOVE_CHANNEL":
          return {
            ...state,
            selectedQuince: {
              ...selectedQuince,
              channels: selectedQuince.channels.filter((_, idx) => idx !== payload)
            }
         };
      case "REMOVE_STEP_FROM_CHANNEL":
        return {
          ...state,
        selectedQuince: {
          ...selectedQuince,
          channels: selectedQuince.channels.reduce((acc, channel, chIdx) => {
            return chIdx === payload
            ? [ ...acc, { ...channel, steps: channel.steps.slice(0, channel.steps.length - 1 ) } ]
            : [ ...acc, channel ]
          }, [])
        }
      }
      case "SELECT_DRUMKIT":
        return { ...state, selectedDrumKit: drumKits.find(kit => kit.name === payload) };
      case "SELECT_QUINCE":
        return { ...state, selectedQuince: presetQuinces.find(quince => quince.title === payload) };
      case "TICK":
        return { ...state, tick: state.tick + 1 };
      case "TOGGLE_DRUMKIT_DROPDOWN":
        return { ...state, drumkitDropdown: !state.drumkitDropdown };
      case "TOGGLE_QUINCE_DROPDOWN":
        return { ...state, quinceDropdown: !state.quinceDropdown }
      case "TOGGLE_HELP":
        return { ...state, help: !state.help }
      case "TOGGLE_PLAYING":
        return playing
          ? { ...state, playing: false, tick: 0 }
          : { ...state, playing: true };
      case "TOGGLE_STEP":
        return {
          ...state,
          selectedQuince: {
            ...selectedQuince,
            channels: selectedQuince.channels.reduce((chAcc, channel, chIdx) => {
              return chIdx === payload.chIdx 
                ? [ ...chAcc, {
                    ...channel,
                    steps: channel.steps.reduce((stAcc, step, stIdx) => {
                      let toggle = stIdx === payload.stIdx;
                      return step && toggle
                        ? [ ...stAcc, 0 ]
                        : toggle
                        ? [ ...stAcc, 1 ]
                        : [ ...stAcc, step ];
                    }, [])
                  }]
                : [ ...chAcc, channel];
            }, [])
          }
      }
      default:
        return state;
    }
  }

  const initialState = {
    drumkitDropdown: false,
    help: false,
    playing: false,
    quinceDropdown: false,
    selectedDrumKit: vinyl,
    selectedQuince: emptyQuince,
    tick: 0
  }

  const [ state, dispatch ] = useReducer(
    reducer,
    initialState
  );

  const toggleHelp = _ => dispatch({ msg: "TOGGLE_HELP" });
    
  useEffect(_ => {
    if (state.playing) {
      let interval = 60000 / state.selectedQuince.tempo / 4;
      const tick = setInterval(_ => {
        dispatch({ msg: "TICK" });
      }, interval);
      return _ => clearInterval(tick);
    }
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-auto pt-12">
        <Transport
          changeTempo={ number => dispatch({ msg: "CHANGE_TEMPO", payload: number }) }
          drumKit={ state.selectedDrumKit.name }
          drumkitDropdown={ state.drumkitDropdown }
          drumKits={ drumKits.map(d => d.name) }
          playing={ state.playing }
          presetQuinces={ presetQuinces.map(quince => quince.title) }
          quince={ state.selectedQuince.title }
          quinceDropdown={ state.quinceDropdown }
          selectDrumkit={ kit => dispatch({ msg: "SELECT_DRUMKIT", payload: kit }) }
          selectQuince={ quince => dispatch({ msg: "SELECT_QUINCE", payload: quince })}
          tempo={ state.selectedQuince.tempo }
          tick={ state.tick }
          toggleDrumkitDropdown={ _ => dispatch({ msg: "TOGGLE_DRUMKIT_DROPDOWN" })}
          toggleHelp={ toggleHelp }
          togglePlaying={ _ => dispatch({ msg: "TOGGLE_PLAYING" }) }
          toggleQuinceDropdown={ _ => dispatch({ msg: "TOGGLE_QUINCE_DROPDOWN" })}
        />
        { state.help &&
          <>
            <div className="mb-2">
              Click each drum's name to cycle through available sounds for a given kit.
              <br />
              Click the "!" box to hear the sample.
              <br />
              Click the "x" box to remove a channel from your song.
              <div
                className="hover:text-yellow-600"
                onClick={ toggleHelp }
              >
                Click this line to hide the help!
              </div>
              <br />
              You can add different amounts of steps to each channel. Usually, you'll want them to all be the same length, but if you so choose, your parts can be offset from one another (or more consise, if one drum part repeats itself -- see the preset for "Fifteen Step" by Radiohead.)
            </div>
          </>
        }
        <Sequence
          addStepToChannel={ chIdx => dispatch({ msg: "ADD_STEP_TO_CHANNEL", payload: chIdx }) }
          addChannel={ _ => dispatch({ msg: "ADD_CHANNEL" }) }
          cycleSamples={ (chIdx, sample) => dispatch({ msg: "CYCLE_CHANNEL_SAMPLES", payload: { chIdx, sample } })}
          drumKit={ state.selectedDrumKit }
          playing={ state.playing }
          quince={ state.selectedQuince }
          removeChannel={ chIdx => dispatch({ msg: "REMOVE_CHANNEL", payload: chIdx })}
          removeStepFromChannel={ chIdx => dispatch({ msg: "REMOVE_STEP_FROM_CHANNEL", payload: chIdx })}
          tick={ state.tick }
          toggleStep={ chIdx => stIdx => dispatch({ msg: "TOGGLE_STEP", payload: { chIdx, stIdx } }) }
        />
      </div>
    </>
  );
}
