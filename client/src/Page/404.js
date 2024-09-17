// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  const urlWEB = process.env.REACT_APP_WEB_URL

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to={`${urlWEB}dashboard`} className="text-2xl text-blue-500 hover:underline">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
