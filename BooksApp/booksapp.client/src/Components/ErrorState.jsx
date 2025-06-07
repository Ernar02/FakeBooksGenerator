import React from 'react';

const ErrorState = ({ error }) => {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 text-xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-red-700 mb-2">
        Error Loading Books
      </h3>
      <p className="text-red-600">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
