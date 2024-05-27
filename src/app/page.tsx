"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleDarkMode } from "@/redux/theme/themeSlice";
import Image from "next/image";
import { useState } from "react";
import CreateModal from "./components/createModal";
import UpdateModal from "./components/UpdateModal";
import { deletefood } from "@/redux/reducers/foodReducer";
interface FoodItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Home() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const foods = useAppSelector((state) => state.foodItems);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentFoodItem, setCurrentFoodItem] = useState<FoodItem | null>(null);
  

  const openCreateModal = () => {
    setShowCreateModal(true);
  };
  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openUpdateModal = (foodItem:FoodItem ) => {
    setCurrentFoodItem(foodItem);
    setShowUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setCurrentFoodItem(null);
    setShowUpdateModal(false);
  };
  const handleDelete=(id)=>{
    dispatch(deletefood({id:id}))
  }

 

  return (
    <div className="max-w-[1200px] mx-auto overflow-y-auto p-4">
      <button className="p-2 bg-green-300 rounded-md" onClick={handleDarkMode}>
        {darkMode ? "Light Theme" : "Dark Theme"}
      </button>
      <button onClick={openCreateModal} className="ml-4 p-2 bg-green-500 rounded-md">
        Create Food+
      </button>
      {showCreateModal && <CreateModal closeCreateModal={closeCreateModal} />}
      {showUpdateModal && (
        <UpdateModal
        closeUpdateModal={closeUpdateModal}
          initialData={currentFoodItem}
          // onSubmit={handleUpdate}
        />
      )}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Snap</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td className="py-2 px-4 border-b">{food.id}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle">
                        <Image
                          src={food.image}
                          alt={food.name}
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{food.name}</td>
                <td className="py-2 px-4 border-b">{food.description}</td>
                <td className="py-2 px-4 border-b">${food.price}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col gap-2">
                    <button
                      className="btn btn-info btn-xs"
                      onClick={() => openUpdateModal(food)}
                    >
                      Update
                    </button>
                    <button onClick={()=>handleDelete(food.id)} className="btn btn-error btn-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
