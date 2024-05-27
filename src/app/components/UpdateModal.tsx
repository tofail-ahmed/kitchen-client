import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateFood } from "@/redux/reducers/foodReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

interface UpdateModalProps {
      closeUpdateModal: () => void;
      initialData: FoodItem ; // Allow null


}

interface FoodItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ closeUpdateModal,initialData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FoodItem>({
    defaultValues: initialData
  });
  const dispatch=useAppDispatch()

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<FoodItem> = (data) => {
//    
console.log(data)
dispatch(updateFood(data))
closeUpdateModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-200/30 backdrop-blur-md p-6 rounded-md shadow-lg">
        <h3 className="font-bold text-lg">Update Food Item</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block">Description</label>
            <input
              {...register("description", { required: "Description is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div>
            <label className="block">Price</label>
            <input
              {...register("price", { required: "Price is required", valueAsNumber: true })}
              className="w-full p-2 border rounded"
              type="number"
              step="0.01"
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <label className="block">Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              className="w-full p-2 border rounded"
              type="text"
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn" onClick={closeUpdateModal}>Close</button>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
