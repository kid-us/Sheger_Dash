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

          <div className="lg:grid grid-cols-4 gap-x-6">
            {stock.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded shadow shadow-zinc-900 lg:mb-0 mb-8"
              >
                <img
                  src={s.main_picture}
                  alt="Shoes"
                  className="h-60 w-full object-contain"
                />
                <div className="flex justify-between px-3 py-2">
                  <button
                    onClick={() => {
                      setEdit(true);
                      setEditId(s.uid);
                    }}
                    className="text-xl bi-pen-fill text-green-500"
                  ></button>
                  <button
                    onClick={() => {
                      setDeleteStock(true);
                      setEditId(s.uid);
                    }}
                    className="text-xl bi-trash-fill text-red-500"
                  ></button>
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
