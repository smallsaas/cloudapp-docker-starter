import React from 'react';
import { Flex } from 'layout-flex';

import styles from './index.less';

const { FlexItem } = Flex;

export default function ({ title, children }) {
  const [child, extra] = React.Children.toArray(children);

  return <div className={styles.pageHeader}>
    <Flex
      className={styles.content}
    >
      <FlexItem>
        <div className={styles.title}>{title}</div>
      </FlexItem>
      <div className={styles.fill}></div>
      <FlexItem flex={1}>
        {extra}
      </FlexItem>
    </Flex>
    {child}
  </div>
}