import React, { useState } from 'react';

export default props => {
  const { title, selected, items, selector, theme } = props;
  const [toggled, setToggled] = useState(false);

  const toggle = _ => setToggled(!toggled);

  const list = arr => {
    return (
      <div className={ `${ theme }-dropdown` }>
        { arr.map((item, idx) => {
            return (
              <div
                className={ `${ theme }-item ${idx ? ` ${ theme }-t`: ""}` }
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
      className={ `relative flex flex-row justify-center ${ props.theme }-bubble mr-1` }
      onMouseEnter={ toggle }
      onMouseLeave={ toggle }
    >
      <div
        className="p-3 mx-1 bg-transparent"
      >
        { title }: { selected }
      </div>
      { toggled && list(items) }
    </div>
  );
}