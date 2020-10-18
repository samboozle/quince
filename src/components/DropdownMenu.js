import React from 'react';

export default props => {
  const { predicate, title, selected, items, toggler, selector } = props;

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
      onMouseEnter={ toggler }
      onMouseLeave={ toggler }
    >
      <div
        className="mx-1 p-3 bg-transparent"
      >
        { title }: { selected }
      </div>
      { predicate && list(items) }
    </div>
  );
}