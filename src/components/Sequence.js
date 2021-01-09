import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Channel, String } from './';

const Sequence = props => {

  console.log("sequence rerenders")

  const smallCheck = _ => window.innerWidth < 582;

  const [small, setSmall] = useState(smallCheck());

  const layoutCheck = _ => {
    const sizeChanged = smallCheck() !== small;
    if (sizeChanged) {
      setSmall(!small);
    }
  }

  useEffect(_ => {
    window.addEventListener("resize", layoutCheck);
    return _ => window.removeEventListener("resize", layoutCheck);
  });

  const renderChannels = _ => Object.entries(props.drums)
    .map(([ drum, howl ]) => (
      <Channel
        drum={ drum }guitarString
        howl={ howl }
        key={ `${ drum }-channel` }
        small={ small }
      />
  ));

  const renderStrings = _ => Object.entries(props.strings)
    .map(([ guitarString, howl ]) => (
      <String
        guitarString={ guitarString }
        howl={ howl }
        key={ `${ guitarString }-channel` }
        small={ small }
      />
    ));

  return (
    <>
      <div className={ `${props.theme} py-2 px-2` }>
        <div className={ `${props.theme}-t` }>
          { props.hasDrums ? renderChannels() : "Add Drums" }
        </div>
      </div>
      <div className={ `${props.theme} py-2 px-2 mt-2` }>
        <div className={ `${props.theme}-t` }>
          { props.hasGuitar ? renderStrings() : "Add Guitar" }
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  drums: state.drums,
  strings: state.strings,
  hasGuitar: !!state.selectedQuince.guitar,
  hasDrums: !!state.selectedQuince.channels,
  theme: state.selectedDrumkit,
});

const connector = connect(
  mapStateToProps
);

export default connector(Sequence);
