import React from 'react';
import moment from 'moment';
import Inspector, { chromeDark } from 'react-inspector';
const containerStyles = {
  warn: {
    backgroundColor: '#B5B273',
  },
  error: {
    backgroundColor: '#9f5b5b',
  },
}

const defaultItemStyle = {
  margin: '4px 6px 4px 0',
  padding: '4px 8px',
  backgroundColor: '#4e4e4e',
  borderRadius: '6px',
  display: 'inline-block',
}

/*
  Turn any data into element
*/
function anyToElem(data, ind) {
  // const type = typeof data;
  return (<span
      key={ind}
      style={defaultItemStyle}
    >
      <Inspector
        theme={{
          ...chromeDark,
          BASE_BACKGROUND_COLOR: '#4e4e4e',
          OBJECT_VALUE_NUMBER_COLOR: '#8c85bd',
          OBJECT_VALUE_STRING_COLOR: '#c39480',
          OBJECT_VALUE_REGEXP_COLOR: '#c39480',
          OBJECT_VALUE_SYMBOL_COLOR: '#c39480',
        }}
        key={ind}
        data={data}
      />
    </span>);
}

export default function LogItem({ name, date, args }) {
  const containerStyle = containerStyles[name];
  return (<div
    style={{
      background: '#3e3e3e',
      color: '#fff',
      padding: '8px 12px',
      lineHeight: 1.525,
      borderBottom: '1px solid #5e5e5e',
      ...containerStyle,
    }}
  >
    <span style={{ color: '#979797', marginRight: '9px', fontSize: '11px' }}>{moment(date).format('hh:mm:ss')}</span>
    {
      args.map((arg, ind) => {
        return (anyToElem(arg, ind));
      })
    }
  </div>);
}
