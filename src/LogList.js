import React, { Component } from 'react';
import patchConsole from '../src/patchConsole';
import { add } from './reduceUtil';
import LogItem from './LogItem';

export default class LogList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
    // patch global console
    window.console = patchConsole(({ name, date, args }) => {
      try {
        this.setState({ logs: add(this.state.logs, { name, date, args }) });
      } catch (ex) {
        patchConsole.originConsole.error('[PATCH ERROR]', ex);
      }
    });
    // mitigate call loop on error
    // if (process.env.NODE_ENV !== 'production') {
    //   window.cons = patchedConsole;
    // } else {
    // window.console = patchedConsole;
    // console = patchedConsole;
    // }
  }

  render() {
    return (
      <div>
        <ul style={{ padding: 0, listStyleType: 'none' }}>
          {
            this.state.logs.map((data) => {
              return <LogItem key={data.date} {...data} />;
            })
          }
        </ul>
      </div>
    );
  }
}
