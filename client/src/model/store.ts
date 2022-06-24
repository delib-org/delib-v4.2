import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../control/slices/userSlice';
import consultationsReducer from '../control/slices/consultationsSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    consultations:consultationsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch