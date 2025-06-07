import React, { useEffect } from 'react';
import BookCover from './BookCover';
import BookInfo from './BookInfo';
import BookReviews from './BookReviews';
import { useBookCovers } from '../Hooks/useBookCovers';

const BookDetails = ({ book }) => {
  const { getCover, generateCover } = useBookCovers();
  const coverUrl = getCover(book);

  useEffect(() => {
    if (!coverUrl) {
      generateCover(book);
    }
  }, [coverUrl, generateCover, book]);

  return (
    <div className="bg-gray-50 p-6 border-t">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BookCover book={book} coverUrl={coverUrl} />
        <div className="lg:col-span-2">
          <BookInfo book={book} />
          <BookReviews book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
