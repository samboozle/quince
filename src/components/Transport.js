import React from 'react';
import DropdownMenu from './DropdownMenu';

export default props => {

  const {
    changeTempo, selectDrumkit, drumKit,
    drumkitDropdown, drumKits,
    playing, presetQuinces,
    quinceDropdown, quince, 
    selectQuince,
    tempo, tick,
    toggleDrumkitDropdown,
    toggleHelp,
    togglePlaying,
    toggleQuinceDropdown
  } = props;

  return (
    <div className="flex flex-row my-2 bg-yellow-500 p-2 w-full rounded shadow-sm">
      <div
        className="mr-1 p-3 rounded shadow-sm bg-white hover:bg-yellow-200 active:shadow-none"
        onClick={ togglePlaying }
      >
        { playing ? "Stop" : "Play" }
      </div>
      <div 
        className="mx-1 p-3 rounded shadow-sm bg-white flex flex-row align-center"
      >
        Tempo: { tempo }bpm
      </div>
      <div className="flex flex-col justify-between mr-1">
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => changeTempo(1) }
        >
          +
        </div>
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => changeTempo(-1) }
        >
          -
        </div>
      </div>
      <div className="flex flex-col justify-between mr-1">
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => changeTempo(10) }
        >
          +10
        </div>
        <div
          className="text-sm text-center px-1 bg-white rounded shadow-sm hover:bg-yellow-200"
          onClick={ _ => changeTempo(-10) }
        >
          -10
        </div>
      </div>
      <div 
        className="mx-1 p-3 rounded shadow-sm bg-white"
      >
        Tick: { tick }
      </div>
      <DropdownMenu
        title={ "Drumkit" }
        predicate={ drumkitDropdown }
        items={ drumKits }
        selected={ drumKit }
        toggler={ toggleDrumkitDropdown }
        selector={ selectDrumkit }
      />
      <DropdownMenu
        title={ "Quince" }
        predicate={ quinceDropdown }
        items={ presetQuinces }
        selected={ quince }
        toggler={ toggleQuinceDropdown }
        selector={ selectQuince }
      />
      <div
        className="mx-1 p-3 rounded shadow-sm bg-white hover:bg-yellow-200 active:shadow-none"
        onClick={ toggleHelp }
      >
        Help!
      </div>
    </div>
  );
}