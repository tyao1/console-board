import React from 'react';

/*
  Helper function to only inject LogList when debugging
*/
export default function injectRender() {
  if (process.env.NODE_ENV !== 'production') {
    const component = require('./LogList').default;
    return React.createElement(component);
  }
}
