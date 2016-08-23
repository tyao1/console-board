import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import patchConsole from '../src/patchConsole';
import LogList from '../src/LogList';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>测试测试</h1>
        <p>哈哈哈</p>
        <LogList />
      </div>
    );
  }
}


ReactDOM.render(<Home />, document.querySelector('#app'));

window.console.log('Still working in progress');
window.console.log('Try console.log');
window.console.warn('and console.warn');
window.console.error('or console.error');

/*
 * plain patch
 *

function newOutput({ name, date, args }) {
  patchConsole.originConsole.log(name, date, args);
}

window.console = patchConsole(newOutput);
 */

