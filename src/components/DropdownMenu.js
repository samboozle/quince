import React, { useState } from 'react';

export default props => {
  const { title, selected, items, selector } = props;
  const [toggled, setToggled] = useState(false);

  const toggle = _ => setToggled(!toggled);

  const list = arr => {
    return (
      <div className="absolute right-0 mt-12 border-2 border-blue-800 rounded bg-white">
        { arr.map((item, idx) => {
            return (
              <div
                className={ "bg-transparent p-2 hover:bg-gray-400" + (idx ? " border-t-2 border-gray-400" : "") }
                onClick={ _ => selector(item) }
                key={ title + "-menu-" + idx }
              >
                { item }
              </div>
            );
          })
        }
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-row bg-white rounded shadow-sm mx-1 w-48 justify-center"
      onMouseEnter={ toggle }
      onMouseLeave={ toggle }
    >
      <div
        className="mx-1 p-3 bg-transparent"
      >
        { title }: { selected }
      </div>
      { toggled && list(items) }
    </div>
  );
}