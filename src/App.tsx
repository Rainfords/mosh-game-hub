import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GameGrid from "@components/GameGrid";
import GenreList from "@components/GenreList";
import NavBar from "@components/NavBar";
import { Genre } from "@hooks/useGenres";
import { useState } from "react";
import PlatformSelector from "@components/PlatformSelector";
import { Platform } from "@hooks/useGames";
import SortSelector from "@components/SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  search: string | null;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Flex paddingLeft={2} marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
                selectedPlatform={gameQuery.platform}
              />
            </Box>
            <SortSelector
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
              selectedSortOrder={gameQuery.sortOrder}
            />
          </Flex>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
