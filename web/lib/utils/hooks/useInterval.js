import React, { useState, useEffect, useRef } from 'react';
/**
 * by Dan Abramov
 *
 * @param {function} callback
 * @param {number} delay
 */

export default function useInterval(callback, delay) {
  const savedCallback = useRef(); // 保存新回调

  useEffect(() => {
    savedCallback.current = callback;
  }); // 建立 interval

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}