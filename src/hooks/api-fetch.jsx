import { useCallback, useState } from "react";

function useFetch(callback) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await callback(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [callback]
  );

  return { data, error, loading, fn };
}

export default useFetch;