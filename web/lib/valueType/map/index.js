import config from "./status.config";
export default function valueTypeMap(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    map = {}
  } = options;
  return map[text] || config[text] || text;
}