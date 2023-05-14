import { HStack, Image, List, ListItem, Text } from "@chakra-ui/react";
import useGenres from "src/hooks/useGenres";
import getCroppedImageUrl from "src/services/image-url";

const GenraList = () => {
  const { data: genres } = useGenres();
  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenraList;
