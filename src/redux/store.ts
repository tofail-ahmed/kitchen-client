import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const persistConfig={
      key:'root',
      storage,
}
const persistedThemeReduced=persistReducer(persistConfig,themeReducer)
export const store = configureStore({
  reducer: {
    theme: persistedThemeReduced,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store)
