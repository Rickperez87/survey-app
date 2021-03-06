import { useState } from "react";

export default function (initialVal) {
  const [value, setValue] = useState(initialVal);
  const handleChange = function (e) {
    setValue(e.target.value);
  };
  const clear = function () {
    setValue("");
  };

  return [value, handleChange, clear];
}
