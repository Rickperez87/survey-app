import { useState } from "react";

function useToggle(initialVal) {
  const [state, setState] = useState(initialVal);
  const toggler = () => setState(!state);

  return [state, toggler];
}

export default useToggle;
