import React from 'react';

/*
  Helper function to only inject LogList when debugging
*/
export default function injectRender(props) {
  if (process.env.NODE_ENV !== 'production') {
    const component = require('./LogList').default;
    return React.createElement(component, props);
  }
}
