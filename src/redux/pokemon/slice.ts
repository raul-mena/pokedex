import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { PokemonCardInformation } from '../../types.d';

// Define a type for the slice state
interface PokemonState {
  favorites: Array<PokemonCardInformation>;
  count: number,
}

// Define the initial state using that type
const initialState: PokemonState = {
  count: 0,
  favorites: [],
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToFavorites: (state, {payload}) => {
      state.favorites.push(payload)
      state.count += 1
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(pokemon => pokemon.id !== payload.id)
      state.count -= 1
    },
  },
})

export const { removeFromFavorites, addToFavorites } = pokemonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.pokemon

export default pokemonSlice.reducer