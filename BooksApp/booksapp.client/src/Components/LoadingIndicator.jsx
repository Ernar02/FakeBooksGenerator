import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="text-center py-8 border-t bg-gray-50">
      <div className="inline-flex items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
        <span className="text-gray-600">Loading more books...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
