import { useState } from "react";

const Brands = () => {
  const [brands, setBrands] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (brands.length < 3) {
      setError(true);
      return;
    }

    setError(false);
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
        <div className="grid grid-cols-12 bg-white rounded shadow shadow-zinc-900 p-4 w-80 mt-3">
          <div className="mb-3 col-span-10">
            <p>Nike</p>
          </div>
          <div className="mb-3 col-span-2">
            <button className="bi-trash-fill text-red-600"></button>
          </div>

          <div className="col-span-10">
            <p>Adidas</p>
          </div>
          <div className="col-span-2">
            <button className="bi-trash-fill text-red-600"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
