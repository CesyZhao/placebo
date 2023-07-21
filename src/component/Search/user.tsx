import React from 'react';

const User = (props: any) => {
  const { index, data } = props;
  return (
    <div style={{ height: '30px' }}>{index}</div>
  );
};

export default User;
