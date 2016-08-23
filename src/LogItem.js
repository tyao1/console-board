import React from 'react';
import moment from 'moment';

const containerStyles = {
  warn: {
    backgroundColor: '#B5B273',
  },
  error: {
    backgroundColor: '#9f5b5b',
  },
}

/*
  Turn any serializable data into string
  Simple Version
*/
function anyToString(data) {
  if (typeof data === 'number' || typeof data === 'string' || typeof data === 'function') {
    return data;
  }
  return JSON.stringify(data);
}

export default function LogItem({ name, date, args }) {
  const containerStyle = containerStyles[name];
  return (<li
    style={{
      background: '#3e3e3e',
      color: '#fff',
      padding: '8px 12px',
      lineHeight: 1.525,
      borderBottom: '1px solid #5e5e5e',
      ...containerStyle,
    }}
  >
    <span style={{ color: '#979797', marginRight: '9px' }}>{moment(date).format('hh:mm:ss')}</span>
    {
      args.map((arg, ind) => {
        return (<span
          key={ind}
          style={{
            margin: '4px 6px 4px 0',
            padding: '4px 8px',
            backgroundColor: '#4e4e4e',
            borderRadius: '6px',
            display: 'inline-block',
          }}
        >
          {anyToString(arg)}
        </span>);
      })
    }
  </li>);
}
