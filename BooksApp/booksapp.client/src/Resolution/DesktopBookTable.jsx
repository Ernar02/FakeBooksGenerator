import React from 'react';
import BookTableRow from '../Components/BookTableRow';
import BookDetails from '../Components/BookDetails';

const DesktopBookTable = ({
  books,
  expandedRows,
  toggleExpanded,
  generateCover,
}) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ISBN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Publisher
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stats
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {books.map((book, bookIndex) => (
            <React.Fragment key={`book-${book.index || bookIndex}`}>
              <BookTableRow
                book={book}
                isExpanded={expandedRows.has(book.index)}
                onToggleExpanded={toggleExpanded}
              />
              {expandedRows.has(book.index) && (
                <tr>
                  <td colSpan="7" className="p-0">
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

export default DesktopBookTable;
