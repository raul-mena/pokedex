import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../utils/constants';
import { PokemonsResponse } from '../../types.d';

export const pokemonApi = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
	endpoints: (builder) => ({
		getPokemons: builder.query({
			query: (params) => `pokemons?${new URLSearchParams(params).toString()}`,
			transformResponse: ({data, count, hasNext}: PokemonsResponse) => ({
				results: data.map(p => ({...p, id: Number(p.url.slice(0, -1).split('/').pop()) })),
				count,
				hasNext
			}),
		}),
		findPokemon: builder.query({
			query: (value) => `pokemon/details/${value}`,
			transformResponse: ({data}: any) => ({
				id: data.id,
				name: data.name,
				url: data.avatar
			}),
		})
	}),
});

export const { useGetPokemonsQuery, useFindPokemonQuery } = pokemonApi;