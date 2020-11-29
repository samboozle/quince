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
    <>
      { renderChannels() }
      <div
        onClick={ props.addChannel }
        className="p-2 border-4 border-blue-800 hover:bg-yellow-200 w-40 h-12 flex justify-center items-center"
      >
        Add Channel
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  selectedQuince: state.selectedQuince,
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