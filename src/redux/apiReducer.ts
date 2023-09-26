import { pokemonApi } from "./pokemon/query";

export const apiReducers = {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
}

export const apiMiddleware = [
    pokemonApi.middleware,
]