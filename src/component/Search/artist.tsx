import React from 'react';

const Artist = (props: any) => {
  const { index, data } = props;
  return (
    <div style={{ height: '30px' }}>{index}</div>
  );
};

export default Artist;
