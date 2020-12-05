import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [state, handleChange] = useState(initialValue);

  const reset = useCallback(() => handleChange(""), []);

  return [state, handleChange, reset];
};

export default useInput;
