// src/components/BookTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";

const BookTable = ({ books }) => {
  return (
    <div className="overflow-x-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-xl shadow-lg">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-left">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Published Year</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <motion.tr
              key={book._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`text-center transition-all duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-purple-100`}
            >
              <td className="py-3 px-4 font-semibold text-gray-700">
                {index + 1}
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium">
                {book.title}
              </td>
              <td className="py-3 px-4 text-gray-700">{book.author}</td>
              <td className="py-3 px-4 text-gray-700">{book.publishYear}</td>
              <td className="py-3 px-4 flex justify-center items-center gap-4">
                <Link
                  to={`/books/details/${book._id}`}
                  title="View Details"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125"
                >
                  <BsInfoCircle size={20} />
                </Link>
                <Link
                  to={`/books/edit/${book._id}`}
                  title="Edit Book"
                  className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-125"
                >
                  <AiOutlineEdit size={20} />
                </Link>
                <Link
                  to={`/books/delete/${book._id}`}
                  title="Delete Book"
                  className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-125"
                >
                  <MdOutlineDelete size={20} />
                </Link>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
