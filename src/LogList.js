import React, { Component, PropTypes } from 'react';
import patchConsole from '../src/patchConsole';
import { add, clear } from './reduceUtil';
import LogItem from './LogItem';
import Input from './Input';

export default class LogList extends Component {


  static propTypes = {
    toggleByTouch: PropTypes.bool,
    showOnInit: PropTypes.bool, 
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.showOnInit,
      enlarge: false,
      logs: [],
    };
    // patch global console as early as possible
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

  componentDidMount() {
    // listening to touch
    if (this.props.toggleByTouch) {
      this.touchCount = 0;
      window.addEventListener('touchend', (evt) => {
        this.touchCount++;
        if (this.touchCount === 3) {
          this.setState({ show: !this.state.show });
          this.touchCount = 0;
          clearTimeout(this.clearHandler);
          return;
        }
        if (this.touchCount === 1) {
          this.clearHandler = setTimeout(() => {
            this.touchCount = 0;
          }, 2000);
        }
      });
    }
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


  clear = () => {
    this.setState({
      logs: add(clear(this.state.logs), { name: 'log', date: Date.now(), args: ['Console is cleared'] })
    });
  };

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: '#2a2a2a',
          height: '24px',
          color: '#fff',
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
          padding: 0,
          listStyleType: 'none',
          overflowY: 'auto',
          // height: '100%',
          flex: 1,
          margin: 0,
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {
          this.state.logs.map((data, ind) => {
            return <LogItem key={ind} {...data} />;
          })
        }
      </ul>
      {this.props.showInput && <Input clear={this.clear} />}
    </div>);
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        {
          !this.props.toggleByTouch && !show && <button
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
