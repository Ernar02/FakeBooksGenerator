import React from 'react';

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">📖</div>
      <h3 className="text-lg font-medium text-gray-600 mb-2">No books found</h3>
      <p className="text-gray-500">Adjust your parameters and try again</p>
    </div>
  );
};

export default EmptyState;
