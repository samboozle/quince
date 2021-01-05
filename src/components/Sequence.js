import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Channel } from './';

const Sequence = props => {

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

  const renderChannels = _ => Object.entries(props.selectedQuince.channels)
    .map(([ sample, steps ]) => (
      <Channel
        sample={ sample }
        drum={ props.drums[sample] }
        key={ `${sample}-channel` }
        steps={ steps }
        small={ small }
      />
  ));

  return (
    <div className={ `${props.theme} py-2 px-2` }>
      <div className={ `${props.theme}-t` }>
        { renderChannels() }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  drums: state.drums,
  selectedQuince: state.selectedQuince,
  theme: state.selectedDrumkit,
});

const connector = connect(
  mapStateToProps
);

export default connector(Sequence);