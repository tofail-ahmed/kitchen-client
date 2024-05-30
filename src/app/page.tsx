"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleDarkMode, setThemeColor } from "@/redux/theme/themeSlice";
import Image from "next/image";
import { useState } from "react";
import CreateModal from "./components/createModal";
import UpdateModal from "./components/UpdateModal";
import { deletefood } from "@/redux/reducers/foodReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FoodItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Home() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const themeColor = useAppSelector((state) => state.theme.themeColor);
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

  const openUpdateModal = (foodItem: FoodItem) => {
    setCurrentFoodItem(foodItem);
    setShowUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setCurrentFoodItem(null);
    setShowUpdateModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deletefood({ id: id }));
  };

  const confirmDelete = (id: number) => {
    toast.warn(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-300 px-2 rounded-md"
            onClick={() => handleDelete(id)}
          >
            Yes
          </button>
          <button
            className="bg-green-300 px-2 rounded-md"
            onClick={() => toast.dismiss}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        closeButton: true,
        draggable: false,
        progress: undefined,
      }
    );
  };

  const [colorInput, setColorInput] = useState('');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(e.target.value);
  };

  const applyColor = () => {
    dispatch(setThemeColor(colorInput));
  };

  return (
    <div className="max-w-[1200px] mx-auto overflow-y-auto p-4" >
      {/* <button className="p-2 bg-green-300 rounded-md" onClick={handleDarkMode}>
        {darkMode ? "Light Theme" : "Dark Theme"}
      </button> */}
      <input 
        type="text" 
        placeholder="Set Theme Color" 
        value={colorInput} 
        onChange={handleColorChange} 
        className="ml-4 p-2 border rounded-md"
      />
      <button onClick={applyColor} className="ml-2 p-2 bg-green-300 rounded-md border-2 border-slate-400">Set Theme</button>
      <button onClick={openCreateModal} className="ml-4 p-2 bg-green-500 rounded-md border-2 border-slate-400">
        Create Food+
      </button>
      {showCreateModal && <CreateModal closeCreateModal={closeCreateModal} />}
      {showUpdateModal && currentFoodItem && (
        <UpdateModal
          closeUpdateModal={closeUpdateModal}
          initialData={currentFoodItem}
        />
      )}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white/0">
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
                    <button onClick={() => confirmDelete(food.id)} className="btn btn-error btn-xs">Delete</button>
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
