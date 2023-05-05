import React, { FC, PropsWithChildren } from 'react'
import styles from "./styles.module.scss";

const BorderButton: FC<PropsWithChildren> = (props) => {
  return (
    <div className={styles.container}>
      <button>{props.children}</button>
    </div>
  );
};

export default BorderButton;
