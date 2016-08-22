import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import patchConsole from '../src/patchConsole';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>测试测试</h1>
        <p>哈哈哈</p>
      </div>
    );
  }
}


ReactDOM.render(<Home />, document.querySelector('#app'));

function newOutput({ name, date, args }) {
  patchConsole.originConsole.log(name, date, args);
}

window.console = patchConsole(newOutput);

