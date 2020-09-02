import React from 'react';
import styles from '../index.less';

export default function DetailsTitle({ title }) {
  return <div className={styles.title}>
    <div>
      {title}
    </div>
  </div>
}