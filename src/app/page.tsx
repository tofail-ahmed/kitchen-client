"use client"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleDarkMode } from "@/redux/theme/themeSlice";
import Image from "next/image";

export default function Home() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  let foods = useAppSelector((state) => state.foodItems);
  // console.log(foods)
  return (
    <div className="max-w-[1200px] mx-auto overflow-y-auto">
      <button className="p-2 bg-green-300 rounded-md" onClick={handleDarkMode}>
        {darkMode ? "Light Theme" : "Dark Theme"}
      </button>

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
                <th className="flex flex-col gap-2 items-center justify-center my-auto ">
                  <button className="btn btn-info btn-xs">Edit</button>
                  <button className="btn btn-error btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
