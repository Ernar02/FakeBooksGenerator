import React from 'react';

const BookInfo = ({ book }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">Publisher</h3>
        <p className="text-gray-600">{book.publisher}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">ISBN</h3>
        <p className="text-gray-600 font-mono text-sm">{book.isbn}</p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">Likes</h3>
        <p className="text-gray-600 flex items-center">
          <span className="text-red-500 mr-1">❤️</span>
          {book.likes}
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-1">Reviews Count</h3>
        <p className="text-gray-600 flex items-center">
          <span className="text-blue-500 mr-1">💬</span>
          {book.reviewsCount}
        </p>
      </div>
    </div>
  );
};

export default BookInfo;
