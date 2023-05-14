import { useEffect, useState } from "react";
import apiClient from "src/services/api-client";
import { AxiosRequestConfig } from "Axios";

interface DataResponse<T> {
  count: number;
  results: Array<T>;
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<Array<T>>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const abortController = new AbortController();
      setLoading(true);
      apiClient
        .get<DataResponse<T>>(endpoint, {
          signal: abortController.signal,
          ...requestConfig,
        })
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );
  return { data, error, isLoading };
};

export default useData;
