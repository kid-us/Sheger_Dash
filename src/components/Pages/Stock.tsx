import SmallNavbar from "../Dashboard/SmallNav";
import Sidebar from "../Dashboard/Sidebar";
import Nav from "../Dashboard/Nav";
import useStock from "../../hooks/useStock";
import { useState } from "react";
import Edit from "../Modal/Edit";
import Confirmation from "../Modal/Confirmation";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Stock = () => {
  const [title] = useState("Stock");
  useDocumentTitle(title);

  const { stock } = useStock();

  const [edit, setEdit] = useState<boolean>(false);
  const [deleteStock, setDeleteStock] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  return (
    <>
      {edit && (
        <Edit
          id={editId}
          onClose={() => {
            setEdit(false);
            setEditId("");
          }}
        />
      )}

      {deleteStock && (
        <Confirmation
          name="Delete"
          id={editId}
          onDelete={() => {
            setDeleteStock(false);
            setEditId("");
          }}
        />
      )}

      <div className="relative lg:grid md:grid grid-cols-11">
        {/* Small device Navbar */}
        <SmallNavbar active="Stock" />
        {/* Sidebar */}
        <div className="lg:col-span-2 w-full">
          {/* <div className=""> */}
          <Sidebar active="Stock" />
          {/* </div> */}
        </div>
        <div className="lg:col-span-9 md:col-span-10 lg:p-8 p-3">
          {/* Nav */}
          <Nav />

          {/* Analytics */}
          <p className="text-black font-poppins my-5 text-xl">
            Available Shoes in stocks
          </p>

          <div className="lg:grid grid-cols-4 gap-5">
            {stock.map((s) => (
              <div key={s.id} className="lg:mb-1 mb-6">
                <div className="bg-white rounded shadow ">
                  <img
                    src={s.main_picture}
                    alt="Shoes"
                    className="h-44 w-full object-contain"
                  />
                </div>
                <div className="mt-1">
                  <button
                    onClick={() => {
                      setEdit(true);
                      setEditId(s.uid);
                    }}
                    className="bi-pen-fill bg-green-500 text-white text-sm rounded p-2 w-full mb-1"
                  >
                    <span className="mx-2"></span>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteStock(true);
                      setEditId(s.uid);
                    }}
                    className="bi-trash-fill bg-red-500 text-white text-sm rounded p-2 w-full"
                  >
                    <span className="mx-2"></span>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
