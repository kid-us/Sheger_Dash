import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";
import usePromo from "../../hooks/usePromo";
// import usePromo from "../../hooks/usePromo";

const Promo = () => {
  const [promo, setPromo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { promos } = usePromo();

  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [newDiscount, setNewDiscount] = useState<string>("");

  // Create Promo
  const handleSubmit = () => {
    if (promo.length < 1) {
      setError(true);
      return;
    }

    setError(false);

    const data = {
      discount: Number(promo) / 100,
    };

    axios
      .post(`${baseUrl}admin/create-promo-code`, data, {
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

  // Delete Promo
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}admin/delete-promo-code?promo_id=${id}`, {
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

  // Edit Promo
  const handleEditPromoDiscount = (id: number) => {
    const data = {
      discount: Number(newDiscount) / 100,
      promo_id: id,
    };
    axios
      .put(`${baseUrl}admin/edit-discount`, data, {
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
      <div className="lg:mt-0 mt-6">
        {/* Create Categories */}
        <label htmlFor="category" className="block mb-2 text-sm">
          Create Promo Codes
        </label>
        <input
          type="text"
          name="category"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow shadow-zinc-900 lg:w-80 w-full block placeholder:text-sm"
          onChange={(e) => setPromo(e.currentTarget.value)}
          value={promo}
          placeholder="Promo Percentage"
        />
        {error && (
          <p className="text-xs mt-1 text-red-700">Category required</p>
        )}
        <button
          onClick={handleSubmit}
          className="btn-bg lg:w-80 w-full mt-3 rounded h-10 shadow shadow-zinc-900"
        >
          Create
        </button>

        {/* List of Promos */}
        <p className="mt-7">List of active Promos</p>
        <div className="bg-white  rounded shadow shadow-zinc-900 px-2 pt-3 lg:w-80 mt-3">
          {promos.length > 0 ? (
            promos.map((p) => (
              <div key={p.id} className="grid grid-cols-12 mb-2 py-2">
                <div className="mb-3 lg:col-span-7 col-span-11">
                  <p className="text-xs font-bold">{p.code}</p>
                </div>

                <div className="col-span-3 me-5">
                  <input
                    className={`${
                      editId === p.id
                        ? "rounded shadow h-8 text-center border border-black"
                        : ""
                    }  font-bold text-sm w-full focus:outline-none`}
                    onChange={(e) => setNewDiscount(e.currentTarget.value)}
                    value={
                      editId === p.id
                        ? newDiscount
                        : (p.discount * 100).toFixed(0) + "%"
                    }
                    readOnly={editId === p.id ? false : true}
                  ></input>
                </div>

                <div className="col-span-2 flex justify-between">
                  <>
                    {edit && editId === p.id ? (
                      <button
                        onClick={() => handleEditPromoDiscount(p.id)}
                        className="bi-check-circle-fill text-blue-600 text-2xl"
                      ></button>
                    ) : (
                      <button
                        onClick={() => {
                          setEdit(true);
                          setEditId(p.id);
                        }}
                        className="bi-pen-fill text-green-600"
                      ></button>
                    )}

                    {edit && editId === p.id ? (
                      <button
                        onClick={() => {
                          setEdit(false);
                          setEditId(0);
                        }}
                        className="bi-x-lg"
                      ></button>
                    ) : (
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bi-trash-fill text-red-600"
                      ></button>
                    )}
                  </>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center pb-3">
              You haven't crate any promo codes yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Promo;
