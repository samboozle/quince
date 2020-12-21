import React from 'react';
import { connect } from 'react-redux';

import {
  addChannel,
  addStepToChannel,
} from '../actions';

import { Channel } from './';

const Sequence = props => {

  const renderChannels = _ => {
    return props.selectedQuince.channels.map(({ sample, steps }, idx) => {
      let key = "ch-" + idx;
      return (
        <Channel
          chIdx={ idx }
          sample={ sample }
          key={ key }
          steps={ steps }
        />
      )
    });
  }

  return (
    <div className={ `${props.theme} py-2 px-2 mb-` }>
      <div
        onClick={ props.addChannel }
        className={ `${props.theme}-button w-40 h-12 mb-1` }
      >
        Add Channel
      </div>
      <div className={ `${props.theme}-t mt-2` }>
        { renderChannels() }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  selectedQuince: state.selectedQuince,
  theme: state.selectedDrumkit.name,
});

const actions = {
  addChannel,
  addStepToChannel,
}

const connector = connect(
  mapStateToProps,
  actions
);

export default connector(Sequence);