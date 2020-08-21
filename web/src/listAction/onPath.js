import { history } from 'umi';

export default function onPath({ options, record }) {
  const { path, query = { id: 'id' } } = options;
  const data = {};
  Object.keys(query).forEach(toKey => {
    const formKey = query[toKey];
    data[toKey] = record[formKey] || formKey;
  });

  history.push({
    pathname: path,
    query: data,
  });
}