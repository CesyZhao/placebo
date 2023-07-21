import React from 'react';
import styles from './style.module.scss';


const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
