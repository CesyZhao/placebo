import React from 'react'

const Music = (props: any) => {
  const { index, data } = props;
  console.log(props, '-------------')
  return (
    <div style={{ height: '30px' }}>{index}</div>
  )
};

export default Music;
