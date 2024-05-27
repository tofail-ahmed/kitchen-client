"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleDarkMode } from "@/redux/theme/themeSlice";
import Image from "next/image";
import { useState } from "react";
import CreateModal from "./components/createModal";
export default function Home() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  let foods = useAppSelector((state) => state.foodItems);
  // console.log(foods)
  const [showModal,setShowModal]=useState(false)
  // console.log(showModal)
  const openModal=()=>{
    setShowModal(true)
  }
  const closeModal=()=>{
    setShowModal(false)
  }
  return (
    <div className="max-w-[1200px] mx-auto overflow-y-auto -z-10">
      <button className="p-2 bg-green-300 rounded-md" onClick={handleDarkMode}>
        {darkMode ? "Light Theme" : "Dark Theme"}
      </button>
<button onClick={openModal} className="rounded-md bg-green-500 p-2">Create Food+</button>
{
  showModal && <CreateModal closeModal={closeModal}/>
}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Snap</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {foods.map((food) => (
              <tr key={food.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle ">
                        <Image
                          src={food.image}
                          alt="Avatar Tailwind CSS Component"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    
                  </div>
                </td>
                <td>
                 {food.name}
                </td>
                <td>
                 {food.description}
                </td>
                <td>${food.price}</td>
                <td className=" ">
  <div className="flex flex-col gap-2">
    <button className="btn btn-info btn-xs">Edit</button>
    <button className="btn btn-error btn-xs">Delete</button>
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
