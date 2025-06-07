import React from 'react';
import BookStats from './BookStats';

const BookTableRow = ({ book, isExpanded, onToggleExpanded }) => {
  return (
    <tr
      className={`border-b hover:bg-gray-50 transition-colors ${
        isExpanded ? 'bg-blue-50' : ''
      }`}
    >
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        {book.index}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{book.isbn}</td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 max-w-xs">
          {book.title}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{book.publisher}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <BookStats likes={book.likes} reviewsCount={book.reviewsCount} />
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onToggleExpanded(book.index)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            isExpanded
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isExpanded ? '▲ Hide' : '▼ Details'}
        </button>
      </td>
    </tr>
  );
};

export default BookTableRow;
