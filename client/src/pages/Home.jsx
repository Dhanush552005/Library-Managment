import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Booktable from "../components/Booktable";
import Bookcard from "../components/Bookcard";
import { MdOutlineAddBox } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-6"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          📚 Book Library
        </h1>

        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${
              view === "table"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setView("card")}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${
              view === "card"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Card View
          </button>
        </div>

        <Link
          to="/books/create"
          className="flex items-center bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <MdOutlineAddBox className="text-xl mr-2" />
          Add Book
        </Link>
      </motion.div>

      {/* Book Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 shadow-xl"
      >
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : view === "table" ? (
          <Booktable books={books} />
        ) : (
          <Bookcard books={books} />
        )}
      </motion.div>
    </div>
  );
};

export default Home;
