import { SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import useGames from "@hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "src/App";

interface Props {
  gameQuery: GameQuery;
}

const breakpoints = {
  sm: { minWidth: "(min-width: 320px)", skeletons: 1 }, // 480px
  md: { minWidth: "(min-width: 768px)", skeletons: 4 }, // 768px
  lg: { minWidth: "(min-width: 992px)", skeletons: 6 }, // 992px
  xl: { minWidth: "(min-width: 1280px)", skeletons: 10 }, // 1280px
};
const minWidths = Object.values(breakpoints).map(
  (breakpoint) => breakpoint.minWidth
);

const GameGrid = ({ gameQuery }: Props) => {
  const [sm, md, lg, xl] = useMediaQuery(minWidths);
  const numberOfskeletons = xl
    ? breakpoints.xl.skeletons
    : lg
    ? breakpoints.lg.skeletons
    : md
    ? breakpoints.md.skeletons
    : sm
    ? breakpoints.sm.skeletons
    : 1;
  const skeletons = [...Array(numberOfskeletons + 1).keys()].slice(1);
  const { data: games, error, isLoading } = useGames(gameQuery);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={3}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
