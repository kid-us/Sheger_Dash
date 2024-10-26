import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";
import usePromo from "../../hooks/usePromo";

const Promo = () => {
  const [promo, setPromo] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const { promos } = usePromo();

  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [newDiscount, setNewDiscount] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const access_token = localStorage.getItem("admin_token");

  // Create Promo
  const handleSubmit = () => {
    if (promo < 1) {
      setError(true);
      return;
    }

    setLoader(true);
    setError(false);

    const data = {
      discount: Number(promo) / 100,
    };

    axios
      .post(`${baseUrl}admin/create-promo-code`, data, {
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

  // Delete Promo
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}admin/delete-promo-code?promo_id=${id}`, {
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
        {/* Create Promo */}
        <label htmlFor="promo" className="block mb-2 text-sm">
          Create Promo Codes
        </label>
        <input
          type="number"
          name="promo"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow lg:w-80 w-full block placeholder:text-sm"
          onChange={(e) => setPromo(Number(e.currentTarget.value))}
          value={promo}
          placeholder="Promo Percentage"
          min={1}
        />
        {error && (
          <p className="text-xs mt-1 text-red-700">Promo value required</p>
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

        {/* List of Promos */}
        <p className="mt-7">List of active Promos</p>
        <div className="bg-white  rounded shadow px-2 pt-3 lg:w-80 mt-3">
          {promos.length > 0 ? (
            promos.map((p) => (
              <div key={p.id} className="grid grid-cols-12 mb-2 py-2">
                <div className="mb-3 lg:col-span-7 col-span-8">
                  <p className="text-xs font-bold">{p.code}</p>
                </div>

                <div className="lg:col-span-3 col-span-2 me-5">
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
