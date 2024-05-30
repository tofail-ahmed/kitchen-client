import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  themeColor: 'skyblue', // default color
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

export const { toggleDarkMode, setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
