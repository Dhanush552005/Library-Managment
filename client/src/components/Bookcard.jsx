import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";

const Bookcard = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
      {books.map((book, index) => (
        <motion.div
          key={book._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-indigo-700 mb-2 text-center">
            {book.title}
          </h3>
          <p className="text-gray-700 text-center mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-700 text-center mb-3">
            <strong>Published:</strong> {book.publishYear}
          </p>

          <div className="flex justify-center gap-6 mt-3">
            <Link
              to={`/books/details/${book._id}`}
              title="View Details"
              className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125"
            >
              <BsInfoCircle size={22} />
            </Link>
            <Link
              to={`/books/edit/${book._id}`}
              title="Edit Book"
              className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-125"
            >
              <AiOutlineEdit size={22} />
            </Link>
            <Link
              to={`/books/delete/${book._id}`}
              title="Delete Book"
              className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-125"
            >
              <MdOutlineDelete size={22} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Bookcard;
