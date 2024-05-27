import { foodList } from "@/app/food";
import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "foods",
  initialState: foodList,
  reducers: {
    addFood: (state, action) => {
      // console.log("action",action)
      state.push(action.payload);
    },
    updateFood: (state, action) => {
      const { id, name, description, price, image } = action.payload;
      const upFood = state.find((food) => food.id == id);
      if (upFood) {
        upFood.name = name;
        upFood.description = description;
        upFood.price = price;
        upFood.image = image;
      }
    },
    deletefood: (state, action) => {
      const { id } = action.payload;
      const upFood = state.find((food) => food.id == id);
      if (upFood) {
        return state.filter((food) => food.id !== id);
      }
    },
  },
});
export const { addFood, updateFood, deletefood } = foodSlice.actions;
export default foodSlice.reducer;
