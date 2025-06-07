import React from 'react';

const BookCover = ({ book, coverUrl }) => {
  return (
    <div className="flex justify-center lg:justify-start">
      <div className="book-cover-container">
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-48 h-72 object-cover rounded-lg shadow-lg hover:translate-1 duration-300"
        />
      </div>
    </div>
  );
};

export default BookCover;
