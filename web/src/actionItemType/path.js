import React from 'react';
import { Button } from 'antd';
import { history, withRouter } from 'umi';

function ActionOnPath(props) {
  const { title, options, location } = props;
  const { query = {} } = options;

  function handleClick() {
    const data = {};
    Object.keys(query).forEach(toKey => {
      const formKey = query[toKey];
      data[toKey] = location.query[formKey] || formKey;
    });
    history.push({
      pathname: options.path,
      query: data,
    });
  }

  return <div>
    <Button onClick={handleClick} type="primary">
      {title}
    </Button>
  </div>
}

export default withRouter(ActionOnPath);