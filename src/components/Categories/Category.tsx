import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";
import useCategories from "../../hooks/useCategories";

const Category = () => {
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { categories } = useCategories();

  // Create Category
  const handleSubmit = () => {
    if (category.length < 3) {
      setError(true);
      return;
    }

    setError(false);

    axios
      .post(`${baseUrl}store/create-category?category=${category}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Category
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}store/delete-category?category_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        {/* Create Categories */}
        <label htmlFor="category" className="block mb-2 text-sm">
          Create Categories
        </label>
        <input
          type="text"
          name="category"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow shadow-zinc-900 w-80 block"
          onChange={(e) => setCategory(e.currentTarget.value)}
          value={category}
        />
        {error && (
          <p className="text-xs mt-1 text-red-700">Category required</p>
        )}
        <button
          onClick={handleSubmit}
          className="btn-bg w-80 mt-3 rounded h-10 shadow shadow-zinc-900"
        >
          Create
        </button>

        {/* List of Categories */}
        <p className="mt-7">List of active Categories</p>
        <div className="bg-white  rounded shadow shadow-zinc-900 px-4 pt-3 w-80 mt-3">
          {categories.length > 0 ? (
            categories.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-12 hover:text-gray-400 mb-2"
              >
                <div className="mb-3 col-span-10">
                  <p>{c.category_names}</p>
                </div>

                <div className="col-span-2">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bi-trash-fill text-red-600"
                  ></button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center pb-3">
              You haven't crate any categories yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
