import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../control/slices/userSlice';
import consultationsReducer from '../control/slices/consultationsSlice';
import membersReducer from '../control/slices/membersSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    consultations:consultationsReducer,
    members:membersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch