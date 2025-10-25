import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Deletebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load book data");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    setDeleting(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setDeleting(false);
        navigate("/");
      })
      .catch(() => {
        setError("Failed to delete book");
        setDeleting(false);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading book info...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-200 to-orange-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Book</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-rose-600">{book.title}</strong> by{" "}
          <span className="text-indigo-600">{book.author}</span>?
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            disabled={deleting}
            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold shadow"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Deletebook;
