import React from 'react';
import styles from './style.module.scss'

const Playlist = (props: any) => {
  const { item } = props;
  return (
    <div className={`${styles.result} ${styles.playlist}`}>

      <div>{item.name}</div>
      <div>{item.trackCount} TRACKS</div>
    </div>
  );
};

export default Playlist;
