import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Backbutton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
    >
      <FaArrowLeft className="mr-2" />
      Back to Home
    </button>
  );
};

export default Backbutton;
