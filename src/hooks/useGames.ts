import { useEffect, useState } from "react";
import apiClient from "src/services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface GamesResponse {
  count: number;
  results: Array<Game>;
}
const useGames = () => {
  const [games, setGames] = useState<Array<Game>>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    apiClient
      .get<GamesResponse>("/games", { signal: abortController.signal })
      .then((resp) => {
        setGames(resp.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name == "CanceledError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);
  return { games, error, isLoading };
};

export default useGames;
