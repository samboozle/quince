import React, { useEffect, useReducer } from 'react';

import { Navbar, Sequence, Transport } from './components';
import { acoustic, electro, vinyl } from './drum-kits';

export default _ => {
  const drumKits = [ acoustic, electro, vinyl ];

  const drumKitReducer = (state, { msg, payload }) => {
    switch (msg) {
      case "CHANGE_DRUMKIT":
        return { ...state, selectedDrumKit: payload };
      case "TOGGLE_IS_PLAYING":
        return { ...state, isPlaying: !state.isPlaying };
      case "TICK":
        return { ...state, ticker: state.ticker + 1 };
      case "INCREMENT_TEMPO":
        let { selectedQuince } = state;
        return { ...state, selectedQuince: { ...selectedQuince, tempo: selectedQuince.tempo + 1 }}
      default:
        return state;
    }
  }

  const emptyQuince = {
    title: "Untitled",
    tempo: 120,
    channels: [
      { sample: "kick", steps: [] }
    ]
  }

  const initialState = {
    isPlaying: false,
    selectedQuince: emptyQuince,
    selectedDrumKit: acoustic,
    ticker: 0
  }

  const [ state, dispatch ] = useReducer(
    drumKitReducer,
    initialState
  );
    
  useEffect(_ => {
    let interval = 60000 / state.selectedQuince.tempo;

    const ticker = setInterval(_ => {
      if (state.isPlaying) {
        dispatch({ msg: "TICK" });
        dispatch({ msg: "INCREMENT_TEMPO" })
      }
    }, interval);
    return _ => clearInterval(ticker);
  })

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-auto pt-12">
        <Transport
          toggleIsPlaying={ _ => dispatch({ msg: "TOGGLE_IS_PLAYING" }) }
          isPlaying={ state.isPlaying }
          ticker={ state.ticker }
          tempo={ state.selectedQuince.tempo }
        />
        <div> Selected Drumkit: { state.selectedDrumKit.name } </div>
        <div>
          { drumKits.map((kit, idx) => {
              return (
                <div
                  onClick={ _ => dispatch({ msg: "CHANGE_DRUMKIT", payload: kit }) }
                  key={"kit-" + idx}
                >
                  <div> { kit.name } </div>
                </div>
              );
            })
          }
        </div>
        <Sequence drumKit={ state.selectedDrumKit } />
      </div>
    </>
  );
}
