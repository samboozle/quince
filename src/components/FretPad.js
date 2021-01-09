// todo
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setFret } from '../actions';

const FretPad = props => {

  const { fret, isActive, makesNoise } = props;
  const [dropdown, setDropdown] = useState(false);
  const toggle = _ => setDropdown(!dropdown);
  const fretDropdown = (
    <div className={ `${ props.theme }-dropdown-sm max-h-48 overflow-scroll` }>
      { [ null, "X", ...Array.from({ length: 25 }, (_, i) => i < 10 ? `0${i}` : i+"" ) ].map((item, idx) => {
        return (
          <div
            className={ `${ props.theme }-item ${idx ? ` ${ props.theme }-t`: ""} text-center z-50` }
            onClick={ _ => props.setFret(props.guitarString, props.idx, item) }
            key={ "fret-menu-" + idx }
          >
            { item ? item : "ring" }
          </div>
        );
      }) }
    </div>
  );

  useEffect(_ => {
    if (isActive && makesNoise) {
      props.playGuitar(fret);
    } 
  });

  return (
    <div
      className={ `${ props.theme }-${ isActive ? "active" : makesNoise ? "on" : "off" } relative flex justify-center items-center z-0` }
      onMouseEnter={ toggle }
      onMouseLeave={ toggle }
    >
      { !!fret && fret }
      { dropdown && fretDropdown }
    </div>
  );

}



const makeMapStateToProps = (_initState, ownProps) => {
  const { guitarString, idx } = ownProps;
  return ({ currentTick, playing, selectedDrumkit, selectedQuince }) => {
    const steps = selectedQuince.guitar[ guitarString ];
    const isActive = playing && currentTick % steps.length === idx;
    return {
      currentTick: steps.length > 1 ? null : currentTick,
      isActive,
      theme: selectedDrumkit,
    }
  }
}

const connector = connect(
  makeMapStateToProps,
  { setFret }
);

export default React.memo(connector(FretPad));
