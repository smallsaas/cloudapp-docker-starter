function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useRef } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import uploadFile from "./uploadFile";
import 'braft-editor/dist/index.css';
export default function RichText(props) {
  const {
    name,
    value,
    handle,
    onChange,
    options,
    props: p,
    ...rest
  } = props;
  const {
    API = '/api/fs/uploadfile'
  } = options;
  const [canDo, setCanDo] = useState(false);
  const braftEditor = useRef(BraftEditor.createEditorState(value));
  useDidMount(_ => {
    handle.onFormatValue(name, 'html'); // 若服务器返回了诸如 <p class="media-wrap image-wrap"></p> 这样的字符串
    // 会导致 createEditorState 生成了一个异常的 braftEditor, 并进而引发其它错误
    // 故重新 toHTML, 重新生成 braftEditor

    braftEditor.current = BraftEditor.createEditorState(braftEditor.current.toHTML());
    setCanDo(true);
  });

  function handleSave(bE) {
    braftEditor.current = bE;
    onChange(braftEditor);
  }

  const media = {
    uploadFn: uploadFile.bind(null, API)
  };

  if (canDo) {
    return /*#__PURE__*/React.createElement(BraftEditor, _extends({
      name: name
    }, rest, p, {
      defaultValue: braftEditor.current,
      media: media,
      onChange: handleSave,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }));
  }

  return /*#__PURE__*/React.createElement(BraftEditor, _extends({
    name: name
  }, rest, p, {
    media: media,
    onChange: handleSave,
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
  }));
}