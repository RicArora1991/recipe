import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMeals: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const mealId = action.payload;
      const existingIndex = state.favoriteMeals.findIndex(
        (id) => id === mealId
      );
      if (existingIndex >= 0) {
        state.favoriteMeals.splice(existingIndex, 1);
      } else {
        state.favoriteMeals.push(mealId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
