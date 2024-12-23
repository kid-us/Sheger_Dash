import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";
import useBrands from "../../hooks/useBrands";

const Brands = () => {
  const [brand, setBrand] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { brands } = useBrands();
  const [loader, setLoader] = useState<boolean>(false);

  const access_token = localStorage.getItem("admin_token");

  // Create Brand
  const handleSubmit = () => {
    if (brand.length < 3) {
      setError(true);
      return;
    }
    setLoader(true);
    setError(false);

    axios
      .post(`${baseUrl}store/create-brand?brand=${brand}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Brand
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}store/delete-brand?brand_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
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
      <div className="lg:mt-0 mt-6">
        {/* Create Brands */}
        <label htmlFor="brand" className="block mb-2 text-sm">
          Create Brands
        </label>
        <input
          type="text"
          name="brand"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow lg:w-80 w-full block placeholder:text-sm"
          placeholder="Brand Name"
          onChange={(e) => setBrand(e.currentTarget.value)}
          value={brand}
        />
        {error && (
          <p className="text-xs mt-1 text-red-700">Brand name required</p>
        )}

        {loader ? (
          <p className="py-5 text-black btn-bg w-80 rounded flex justify-center shadow mt-3">
            <span className="loader rounded"></span>
          </p>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-bg lg:w-80 w-full mt-3 rounded h-10 shadow"
          >
            Create
          </button>
        )}

        {/* List of Categories */}
        <p className="mt-7">List of active Brands</p>
        <div className="bg-white  rounded shadow px-4 pt-3 lg:w-80 mt-3">
          {brands.length > 0 ? (
            brands.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-12 hover:text-gray-400 mb-2"
              >
                <div className="mb-3 lg:col-span-10 col-span-11">
                  <p>{b.brand_names}</p>
                </div>

                <div className="lg:col-span-2 col-span-1">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bi-trash-fill text-red-600"
                  ></button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center pb-3">You haven't crate any Brands yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Brands;
