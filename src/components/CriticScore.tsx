import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const colour =
    score > 75
      ? "green"
      : score > 60
      ? "yellow"
      : score > 30
      ? "orange"
      : score > 0
      ? "red"
      : "";
  return (
    <Badge colorScheme={colour} fontSize="14px" paddingX={2} borderRadius="4px">
      {score}
    </Badge>
  );
};

export default CriticScore;
