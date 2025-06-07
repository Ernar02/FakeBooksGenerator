import React from 'react';

const BookStats = ({ likes, reviewsCount }) => {
  return (
    <div className="flex space-x-4">
      <span className="flex items-center">
        <span className="text-red-500 mr-1">❤️</span>
        {likes}
      </span>
      <span className="flex items-center">
        <span className="text-blue-500 mr-1">💬</span>
        {reviewsCount}
      </span>
    </div>
  );
};

export default BookStats;
