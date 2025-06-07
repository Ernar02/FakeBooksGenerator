import React from 'react';
import BookDetails from '../Components/BookDetails';

const TabletBookTable = ({
  books,
  expandedRows,
  toggleExpanded,
  generateCover,
}) => {
  return (
    <div className="hidden md:block lg:hidden overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stats
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {books.map((book, bookIndex) => (
            <React.Fragment key={`book-tablet-${book.index || bookIndex}`}>
              <TabletBookRow
                book={book}
                isExpanded={expandedRows.has(book.index)}
                onToggleExpanded={toggleExpanded}
              />
              {expandedRows.has(book.index) && (
                <tr>
                  <td colSpan="4" className="p-0">
                    <BookDetails book={book} generateCover={generateCover} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TabletBookRow = ({ book, isExpanded, onToggleExpanded }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <td className="px-4 py-4">
      <div className="space-y-1">
        <div className="font-medium text-gray-900 text-sm">{book.title}</div>
        <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
        {book.publisher && (
          <div className="text-xs text-gray-500">{book.publisher}</div>
        )}
      </div>
    </td>
    <td className="px-4 py-4 text-sm text-gray-900">{book.author}</td>
    <td className="px-4 py-4 text-sm text-gray-500">
      <div className="space-y-1">
        {book.pages && <div>Pages: {book.pages}</div>}
        {book.year && <div>Year: {book.year}</div>}
      </div>
    </td>
    <td className="px-4 py-4 text-center">
      <button
        onClick={() => onToggleExpanded(book.index)}
        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isExpanded ? 'Hide' : 'Details'}
      </button>
    </td>
  </tr>
);

export default TabletBookTable;
