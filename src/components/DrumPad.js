import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleStep } from '../actions';

const DrumPad = props => {

  const { isActive, makesNoise } = props;

  useEffect(_ => {
    if (isActive && makesNoise) {
      props.playDrums();
    }
  });

  return (
    <div
      className={ `${ props.theme }-${ isActive ? "active" : makesNoise ? "on" : "off" }` }
      onClick={ _ => props.toggleStep(props.drum, props.idx) }
    />
  );
}

const makeMapStateToProps = (_initState, ownProps) => {
  const { drum, idx } = ownProps;
  return ({ currentTick, playing, selectedDrumkit, selectedQuince }) => {
    const steps = selectedQuince.channels[ drum ];
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
  { toggleStep }
);

export default React.memo(connector(DrumPad));
