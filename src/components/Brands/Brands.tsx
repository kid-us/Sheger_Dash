import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../services/request";

interface BrandItem {
  id: number;
  brand_names: string;
}

interface Brand {
  brands: BrandItem[];
}

const Brands = () => {
  const [brands, setBrands] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [brand, setBrand] = useState<BrandItem[]>([]);

  // Get Brand
  useEffect(() => {
    axios
      .get<Brand>(`${baseUrl}store/get-brands`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setBrand(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Create Brand
  const handleSubmit = () => {
    if (brands.length < 3) {
      setError(true);
      return;
    }

    setError(false);

    axios
      .post(`${baseUrl}store/create-brand?brand=${brands}`, {
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

  // Delete Brand
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}store/delete-brand?brand_id=${id}`, {
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
          Create Brands
        </label>
        <input
          type="text"
          name="category"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow shadow-zinc-900 w-80 block"
          onChange={(e) => setBrands(e.currentTarget.value)}
          value={brands}
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
        <p className="mt-7">List of active Brands</p>
        <div className="bg-white  rounded shadow shadow-zinc-900 px-4 pt-3 w-80 mt-3">
          {brand.length > 0 ? (
            brand.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-12 hover:text-gray-400 mb-2"
              >
                <div className="mb-3 col-span-10">
                  <p>{b.brand_names}</p>
                </div>

                <div className="col-span-2">
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
