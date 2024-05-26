// // src/redux/reducers/foodReducer.ts
// import {
//       Food,
//       FoodActionTypes,
//       FoodState,
//       LOAD_FOODS,
//       ADD_FOOD,
//       EDIT_FOOD,
//       DELETE_FOOD,
//     } from "../types/foodType";
//     import { PersistPartial } from 'redux-persist/es/persistReducer';

import { foodList } from "@/app/food";
import { createSlice } from "@reduxjs/toolkit";

    
//     const initialState: FoodState & PersistPartial = {
//       foods: [],
//       _persist: {
//         version: -1,
//         rehydrated: false,
//       },
//     };
    
//     const foodReducer = (
//       state: (FoodState & PersistPartial) = initialState,
//       action: FoodActionTypes
//     ): FoodState & PersistPartial => {
//       switch (action.type) {
//         case LOAD_FOODS:
//           return { ...state, foods: action.payload };
//         case ADD_FOOD:
//           return { ...state, foods: [...state.foods, action.payload] };
//         case EDIT_FOOD:
//           return {
//             ...state,
//             foods: state.foods.map((food) =>
//               food.id === action.payload.id ? action.payload : food
//             ),
//           };
//         case DELETE_FOOD:
//           return {
//             ...state,
//             foods: state.foods.filter((food) => food.id !== action.payload),
//           };
//         default:
//           return state;
//       }
//     };
    
//     export default foodReducer;
    


const foodSlice=createSlice({
  name:"foods",
  initialState:foodList,
  reducers:{}
})

export default foodSlice.reducer;