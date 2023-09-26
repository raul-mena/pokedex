import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PokemonCardInformation } from '../types.d';
import { addToFavorites, removeFromFavorites } from '../redux/pokemon/slice';
import { useDispatch } from 'react-redux';

interface PokemonCardProps {
  pokemonInfo: PokemonCardInformation
  isFavorite: boolean;
}

function PokemonCard({ pokemonInfo, isFavorite }: PokemonCardProps): JSX.Element {
  const dispatch = useDispatch()
  /**
   * 
   * @param pokemon 
   */
  const toggleFavorites = (pokemon: PokemonCardInformation) => {
    if(isFavorite) {
      dispatch(removeFromFavorites(pokemon));
    } else {
      dispatch(addToFavorites(pokemon));
    }
  }
  /**
   * build id image to read it from cloud
   * @param id 
   * @returns string
   */
  const getImgUrlIndex = (id: number) => {
    if (id < 10) {
      return `00${id}`
    } else if (id >= 10 && id < 100) {
      return `0${id}`
    }
    return id
  }

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {`${pokemonInfo.name[0]}${pokemonInfo.name[1]}`.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites" onClick={() => toggleFavorites(pokemonInfo)}>
            <FavoriteIcon color={isFavorite ? 'error' : 'action' }/>
          </IconButton>
        }
        title={pokemonInfo.name}
        subheader={`ID: ${pokemonInfo.id} `}
      />
      <CardMedia
        component="img"
        height="194"
        image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getImgUrlIndex(pokemonInfo.id)}.png`}
        alt={pokemonInfo.name}
      />
    </Card>
  );
}

export default PokemonCard;