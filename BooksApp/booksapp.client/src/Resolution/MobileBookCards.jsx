import React from 'react';
import BookDetails from '../Components/BookDetails';

const MobileBookCards = ({
  books,
  expandedRows,
  toggleExpanded,
  generateCover,
}) => {
  return (
    <div className="block md:hidden">
      <div className="space-y-4 p-4">
        {books.map((book, bookIndex) => (
          <MobileBookCard
            key={`book-mobile-${book.index || bookIndex}`}
            book={book}
            isExpanded={expandedRows.has(book.index)}
            onToggleExpanded={toggleExpanded}
            generateCover={generateCover}
          />
        ))}
      </div>
    </div>
  );
};

const MobileBookCard = ({
  book,
  isExpanded,
  onToggleExpanded,
  generateCover,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="p-4">
      <MobileBookCardHeader book={book} />
      <MobileBookCardContent book={book} />
      <MobileBookCardActions
        book={book}
        isExpanded={isExpanded}
        onToggleExpanded={onToggleExpanded}
      />
    </div>

    {isExpanded && (
      <div className="border-t border-gray-200">
        <BookDetails book={book} generateCover={generateCover} />
      </div>
    )}
  </div>
);

const MobileBookCardHeader = ({ book }) => (
  <div className="flex justify-between items-start mb-3">
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium text-gray-900 truncate">
        {book.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
    </div>
    <div className="ml-4 flex-shrink-0">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        #{book.index}
      </span>
    </div>
  </div>
);

const MobileBookCardContent = ({ book }) => (
  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-3">
    <div>
      <span className="font-medium">ISBN:</span>
      <div className="mt-1 break-all">{book.isbn}</div>
    </div>
    {book.publisher && (
      <div>
        <span className="font-medium">Publisher:</span>
        <div className="mt-1">{book.publisher}</div>
      </div>
    )}
    {book.pages && (
      <div>
        <span className="font-medium">Pages:</span>
        <div className="mt-1">{book.pages}</div>
      </div>
    )}
    {book.year && (
      <div>
        <span className="font-medium">Year:</span>
        <div className="mt-1">{book.year}</div>
      </div>
    )}
  </div>
);

const MobileBookCardActions = ({ book, isExpanded, onToggleExpanded }) => (
  <div className="flex justify-between items-center">
    <button
      onClick={() => onToggleExpanded(book.index)}
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {isExpanded ? 'Hide Details' : 'Show Details'}
    </button>
  </div>
);

export default MobileBookCards;
