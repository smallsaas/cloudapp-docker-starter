import { useState } from "react";
export default function useOperation() {
  const [data, setData] = useState({});

  function handleClickOperation(d) {
    setData(d);
  }

  return [data, handleClickOperation];
}