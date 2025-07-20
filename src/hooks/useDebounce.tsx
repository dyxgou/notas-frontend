import { useEffect, useState } from "preact/hooks";

function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
export default useDebounce;
