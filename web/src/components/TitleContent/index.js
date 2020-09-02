import React from 'react';
import { Flex } from 'layout-flex';

import styles from './index.less';

const { FlexItem } = Flex;

export default function ({ title, children }) {
  const [child, extra] = React.Children.toArray(children);

  return <div className={styles['Details-pageHeader']}>
    <Flex
      className={styles['Details-content']}
    >
      <FlexItem>
        <div className={styles['Details-title']}>{title}</div>
      </FlexItem>
      <FlexItem>
        {extra}
      </FlexItem>
    </Flex>
    {child}
  </div>
}