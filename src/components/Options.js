import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteAll}
        >
          Remove All
        </button>
    </div>
    {props.options.length === 0 && <p
      className="widget__message"
    >
      Add some options to get started!
    </p>}
      {
        props.options.map((o, i) => (
          <Option
            key={o}
            optionText={o}
            count={i + 1}
            handleDelete={props.handleDelete}
          />
        ))
      }
  </div>
);

export default Options;
