import React from 'react';
import styles from './style.module.scss';

const Artist = (props: any) => {
  const { item } = props;
  return (
    <div className={`${styles.result} ${styles.artist}`}>
      <div className={styles.avatar}><img src={item.picUrl} alt=""/> </div>
      <div className={styles.artistName}>{item.name}</div>
    </div>
  );
};

export default Artist;
