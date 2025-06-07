import { useState, useCallback } from 'react';
import { fetchBooks } from '../services/api';

export const useBooks = (locale, seed, likes, reviews) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadBooks = useCallback(
    async (pageNum = 1, reset = false) => {
      setLoading(true);
      setError(null);

      try {
        const newBooks = await fetchBooks(
          seed,
          pageNum,
          locale,
          likes,
          reviews,
        );

        if (reset) {
          setBooks(newBooks);
        } else {
          setBooks((prev) => [...prev, ...newBooks]);
        }

        setHasMore(newBooks.length > 0);
        setPage(pageNum);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [locale, seed, likes, reviews],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadBooks(page + 1, false);
    }
  }, [loading, hasMore, page, loadBooks]);

  const resetBooks = useCallback(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadBooks(1, true);
  }, [loadBooks]);

  return {
    books,
    loading,
    error,
    loadMore,
    hasMore,
    resetBooks,
  };
};
