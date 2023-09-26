import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon/slice'
import { apiMiddleware, apiReducers } from './apiReducer'
// ...

export const store = configureStore({
  reducer: combineReducers({
    pokemon: pokemonReducer,
    ...apiReducers
  }),
  middleware: (gDM: any) => gDM().concat(apiMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch