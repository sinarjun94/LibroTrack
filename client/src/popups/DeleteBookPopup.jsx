import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../store/slices/bookSlice";
import { toggleDeleteBookPopup } from "../store/slices/popUpSlice";

export const DeleteBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBook(bookId));
    dispatch(toggleDeleteBookPopup());
    };
    
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        dispatch(toggleDeleteBookPopup());
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-96 ">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-3xl hover:bg-gray-300 "
            onClick={() => dispatch(toggleDeleteBookPopup())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookPopup;
