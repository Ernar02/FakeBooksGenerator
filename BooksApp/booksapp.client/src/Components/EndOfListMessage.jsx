import React from 'react';

const EndOfListMessage = ({ booksCount }) => {
  return (
    <div className="text-center py-8 border-t bg-gray-50">
      <span className="text-gray-600">
        📚 All books loaded! Total: {booksCount}
      </span>
    </div>
  );
};

export default EndOfListMessage;
