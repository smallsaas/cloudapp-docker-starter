import { useState, useEffect } from 'react';
/**
 * 为按钮附加长按事件
 * by https://stackoverflow.com/a/54749871
 * @param {function} callback 
 * @param {number} ms 
 */

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);
  useEffect(() => {
    let timerId;

    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);
  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false)
  };
}