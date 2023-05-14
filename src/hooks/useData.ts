import { useEffect, useState } from "react";
import apiClient from "src/services/api-client";

interface DataResponse<T> {
  count: number;
  results: Array<T>;
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<Array<T>>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    apiClient
      .get<DataResponse<T>>(endpoint, { signal: abortController.signal })
      .then((resp) => {
        setData(resp.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name == "CanceledError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);
  return { data, error, isLoading };
};

export default useData;
