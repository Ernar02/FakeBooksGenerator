import React from 'react';

const TableHeader = ({ booksCount }) => {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b">
      <h2 className="text-xl font-semibold text-gray-800">
        Generated Books ({booksCount} loaded)
      </h2>
    </div>
  );
};

export default TableHeader;
