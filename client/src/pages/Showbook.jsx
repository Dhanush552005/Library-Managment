import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";

const Showbook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <Spinner />
      </div>
    );

  if (!book)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 text-red-600 font-semibold text-lg">
        ❌ Book not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 p-6">
      <Backbutton />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6 mt-10"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          📖 Book Details
        </h2>

        <div className="space-y-4 text-gray-800">
          <p className="text-lg">
            <strong className="text-indigo-600">Title:</strong> {book.title}
          </p>
          <p className="text-lg">
            <strong className="text-indigo-600">Author:</strong> {book.author}
          </p>
          <p className="text-lg">
            <strong className="text-indigo-600">Published Year:</strong>{" "}
            {book.publishYear}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Showbook;
