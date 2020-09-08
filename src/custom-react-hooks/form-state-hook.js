import { useState } from "react";

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const clear = () => {
    setValue("");
  };

  return [value, handleChange, clear];
};
