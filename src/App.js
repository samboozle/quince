import React, { useReducer } from 'react';

import { Navbar, Sequence } from './components';
import { acoustic, electro, vinyl } from './drum-kits';

export default _ => {
  const drumKits = [ acoustic, electro, vinyl ];

  const drumKitReducer = (state, { msg, payload }) => {
    switch (msg) {
      case "CHANGE_DRUMKIT":
        return { selectedDrumKit: payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(drumKitReducer, { selectedDrumKit: acoustic });

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-auto pt-12">
        <div> Currently Selected Drumkit: { state.selectedDrumKit.name } </div>
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
