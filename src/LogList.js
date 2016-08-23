import React, { Component } from 'react';
import patchConsole from '../src/patchConsole';
import { add } from './reduceUtil';
import LogItem from './LogItem';

export default class LogList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      enlarge: false,
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

  componentDidUpdate(prevProps, prevState) {
    const logContainer = this.refs.logContainer;
    if (!prevState.show && this.state.show) {
      logContainer.scrollTop = logContainer.scrollHeight;
      return;
    }
    if (logContainer && logContainer.children.length) {
      const lastElem = logContainer.children[logContainer.children.length - 1];
      if (Math.abs(logContainer.scrollTop - (logContainer.scrollHeight - logContainer.getBoundingClientRect().height - lastElem.getBoundingClientRect().height)) < 30) {
        logContainer.scrollTop = logContainer.scrollHeight;
        // this.lastScroll = logContainer.scrollTop;
      }
    }
  }

  renderList() {
    if (!this.state.show) return null;
    return (<div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: this.state.enlarge ? '80%' : '40%',
        background: '#303030',
      }}
    >
      <div
        style={{
          background: '#2a2a2a',
          height: '24px',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          color: '#fff',
          zIndex: 5,
        }}
      >
        <span
          onClick={() => this.setState({ show: false })}
          style={{
            display: 'inline-block',
            height: '24px',
            width: '44px',
            textAlign: 'center',
            lineHeight: '24px',
            float: 'right',
          }}
        >x</span>
        <span
          onClick={() => this.setState({ enlarge: !this.state.enlarge })}
          style={{
            display: 'inline-block',
            height: '24px',
            width: '44px',
            textAlign: 'center',
            lineHeight: '24px',
          }}
        >{ this.state.enlarge ? '-' : '^' }</span>
        
      </div>
      <ul
        ref="logContainer"
        style={{
          padding: '24px 0 0',
          listStyleType: 'none',
          overflowY: 'auto',
          height: '100%',
          margin: 0,
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {
          this.state.logs.map((data) => {
            return <LogItem key={data.date} {...data} />;
          })
        }
      </ul>
    </div>);
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        {
          !show && <button
            onClick={() => this.setState({ show: true })}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '24px',
              border: 'none',
              background: 'rgba(0,0,0,.1)',
              color: '#fff',
              fontSize: '24px',
              lineHeight: '48px',
              position: 'fixed',
              right: '12px',
              bottom: '60px',
              zIndex: 50,
              outline: 'none',
              padding: 0,
              textAlign: 'center',
            }}
          >😂</button>
        }
        {this.renderList()}
      </div>
    );
  }
}
