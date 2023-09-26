import { CircularProgress } from "@mui/material";
import { useFindPokemonQuery } from "../redux/pokemon/query";
import PokemonCard from "./PokemonCard";
import { PokemonCardInformation } from "../types.d";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';

interface PokemonFoundProps {
  value: string;
}

const PokemonFound = ({value}: PokemonFoundProps) => {
  // load information based on the input search
  const {data, isLoading, isError} = useFindPokemonQuery(value)
  const { favorites } = useSelector((state: RootState) => state.pokemon)

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <>Not found</>
  }
  // build pokemon model
  // imporve, ser model on query to return on transform response
  const pokemon: PokemonCardInformation = { 
    name: data?.name || '',
    id: data?.id,
    url: data?.url
  };

  return (
    <PokemonCard
      pokemonInfo={pokemon}
      isFavorite={!!favorites.find(({id}: PokemonCardInformation) => id === pokemon.id )}
    />
  )
}

export default PokemonFound