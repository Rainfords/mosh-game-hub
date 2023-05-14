import useGenres from "src/hooks/useGenres";

const GenraList = () => {
  const { data: genres } = useGenres();
  return (
    <ul>
      {genres.map((genres) => (
        <li key={genres.id}>{genres.name}</li>
      ))}
    </ul>
  );
};

export default GenraList;
