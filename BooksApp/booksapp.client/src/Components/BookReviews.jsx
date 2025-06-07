import React from 'react';

const BookReviews = ({ book }) => {
  if (book.reviewsCount === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <span className="text-4xl mb-2 block">📚</span>
        <p>No reviews yet for this book</p>
      </div>
    );
  }

  if (!book.reviews || book.reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-3">Reviews</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {book.reviews.map((review, index) => (
          <div
            key={`${book.index}-review-${index}`}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                {review.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{review.author}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviews;
