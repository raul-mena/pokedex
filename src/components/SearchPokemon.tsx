import { TextField } from "@mui/material";
import { useState } from "react";
import PokemonFound from "./PokemonFound";

const SearchPokemon = () => {
  const [search, setSearch] = useState<string>('')
  const handleDebouncedSearch = (textValue: string) => {
    setSearch(textValue)
};
  // serach input to get pokeon
  // improve: add debounce functionality
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        style={{margin: '0px 2em', width: 300}}
        variant="outlined"
        onChange={(e) => handleDebouncedSearch(e.target.value)}
        value={search}
      />
      {!!search && <PokemonFound value={search} />}
    </>
  )
}

export default SearchPokemon