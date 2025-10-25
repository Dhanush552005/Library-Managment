import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:5555/books", { title, author, publishYear })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(() => {
        setError("Failed to create book");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-pink-100 to-yellow-100">
      <motion.div
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          📖 Add a New Book
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 outline-none shadow-sm transition"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="p-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 outline-none shadow-sm transition"
          />
          <input
            type="number"
            placeholder="Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
            className="p-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 outline-none shadow-sm transition"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading}
            className={`p-3 mt-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
            }`}
          >
            {loading ? "Saving..." : "Add Book"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBook;
