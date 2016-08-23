/*
  An input for entering command
*/

import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onEnter = (evt) => {
    if (evt.keyCode === 13) {
      if (this.state.text === 'clear') {
        if (this.props.clear) this.props.clear();
        return; 
      }
      window.eval(this.state.text);
      this.state.text = '';
    }
  };

  render() {
    return (<input
      onChange={evt => { this.setState({ text: evt.target.value }); }}
      onKeyDown={this.onEnter}
      value={this.state.text}
      autoFocus
      style={{
        height: '32px',
        border: 'none',
        outline: 'none',
        width: '100%',
        background: '#4a4a4a',
        color: '#fff',
        padding: '0 12px',
      }}
    />);
  }

}
