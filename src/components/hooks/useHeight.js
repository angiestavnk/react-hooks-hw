const { useEffect, useState } = require("react");

const useHeight = (ref, dependencies) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const newHeight = ref.current && ref.current.offsetHeight;
    if (newHeight && height !== newHeight) {
      setHeight(newHeight);
    }
  }, [dependencies]);

  return height;
};

export default useHeight;
