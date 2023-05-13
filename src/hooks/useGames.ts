import { useEffect, useState } from "react";
import apiClient from "src/services/api-client";

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface GamesResponse {
  count: number;
  results: Array<Game>;
}
const useGames = () => {
  const [games, setGames] = useState<Array<Game>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    apiClient
      .get<GamesResponse>("/games", { signal: abortController.signal })
      .then((resp) => setGames(resp.data.results))
      .catch((err) => {
        if (err.name == "CanceledError") return;
        setError(err.message);
      });

    return () => abortController.abort();
  }, []);
  return { games, error };
};

export default useGames;
