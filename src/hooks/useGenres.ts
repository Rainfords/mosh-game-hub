import { useEffect, useState } from "react";
import apiClient from "src/services/api-client";

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface GenreResponse {
  count: number;
  results: Array<Genre>;
}

const useGenres = () => {
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    apiClient
      .get<GenreResponse>("/genres", { signal: abortController.signal })
      .then((resp) => {
        setGenres(resp.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name == "CanceledError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);
  return { genres, error, isLoading };
};

export default useGenres;
