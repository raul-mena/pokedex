import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetPokemonsQuery } from '../redux/pokemon/query';
import { Button, CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { PokemonCardInformation } from '../types.d';
import PokemonCard from '../components/PokemonCard';
import SearchPokemon from '../components/SearchPokemon';
const limit = 20;

export default function HomePage() {
  const { favorites } = useSelector((state: RootState) => state.pokemon)
  const [pokemons, setPokemons] = useState<PokemonCardInformation[]>([])
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const {data, isError, isLoading} = useGetPokemonsQuery({page, limit});
  // hook to add more pokemons when there are new request
  useEffect(() => {
    if (data?.results) {
      setPokemons([...pokemons, ...data.results])
    }
  }, [data])
  
  if (isLoading) {
    return <CircularProgress />
  }
  // error case, needs improve this
  if (isError) {
    return <>Not found</>
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
        <SearchPokemon />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showFavorites}
                onChange={e => setShowFavorites(e.target.checked)}
                color='error'
              />
            }
            label="Favorites" />
        </FormGroup>
      </div>
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {
          (showFavorites ? favorites : pokemons)?.map((pokemon: PokemonCardInformation, index) => (
            <PokemonCard
              key={`${pokemon.id}-${index}`}
              pokemonInfo={pokemon}
              isFavorite={!!favorites.find(({id}) => id === pokemon.id )}
            />
          ))
        }
      </Box>
      {!showFavorites && (
        <Box>
          <Button onClick={() => setPage(page + 1)} >Load More</Button>
        </Box>
      )}
    </>
  );
}
