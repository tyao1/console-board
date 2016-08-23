import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import patchConsole from '../src/patchConsole';
// import LogList from '../src/LogList';
import injectRender from '../src/injectRender';

class Home extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>console-board</h1>
        <p style={{ textAlign: 'center' }}>Injecting console's output to the dom</p>
        {injectRender()}
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

