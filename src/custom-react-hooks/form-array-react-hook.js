import { useState } from "react";

export default function (initialVal) {
  const [value, setValue] = useState(initialVal);
  const handleChange = function (e) {
    setValue(...value, e.target.value);
  };
  const clear = function () {
    setValue("");
  };

  return [value, handleChange, clear];
}
