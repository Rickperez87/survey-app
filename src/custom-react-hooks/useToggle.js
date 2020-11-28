import { useState } from "react";

function useToggle(initialVal) {
  const [state, setState] = useState(initialVal);
  const toggle = function () {
    setState(!state);
  };
  return [state, toggle];
}

export default useToggle;
