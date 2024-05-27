import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addFood } from "@/redux/reducers/foodReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
interface FoodItem {
  name: string;
  description: string;
  price: number;
  image: string;
}
interface CreateModalProps {
  closeModal: () => void;
}
const CreateModal = ({ closeModal }: CreateModalProps) => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector((state) => state.foodItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodItem>();

  const onSubmit: SubmitHandler<FoodItem> = (data) => {
    // event?.preventDefault();
    console.log(data);
    dispatch(addFood(data));
    closeModal();
    // Add your logic here to handle the form submission
  };
  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg ">
        <h3 className="font-bold text-lg">Create a New Food Item</h3>
        <p className="py-4">Fill out the form to add a new food item.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label className="block">Description</label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <label className="block">Price</label>
            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded"
              type="number"
              step="0.01"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div>
            <label className="block">Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn" onClick={closeModal}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
