import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div
      style={{
        padding: 10,
        width: '100%',
        color: 'red',
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {message}
    </div>
  );
}
