import React from 'react';
import styles from '../index.less';

export default function DetailsGroup({ group }) {
  return <div className={styles.group}>
    <div className={styles.groupDecoration}></div>
    <div>
      {group}
    </div>
  </div>
}