// favoriteReducer.js

import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actions";

const initialState = {
  favoriteRecipes: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteRecipes: [...state.favoriteRecipes, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.filter(
          (recipe) => recipe.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
