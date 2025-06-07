import React, { useState, useEffect } from 'react';
import BookTable from './BookTable';
import { useBooks } from '../Hooks/useBooks';
import Header from './Header';

const App = () => {
  const [locale, setLocale] = useState('en');
  const [seed, setSeed] = useState('default');
  const [likes, setLikes] = useState(3.5);
  const [reviews, setReviews] = useState(2.0);

  const { books, loading, error, loadMore, hasMore, resetBooks } = useBooks(
    locale,
    seed,
    likes,
    reviews
  );

  useEffect(() => {
    resetBooks();
  }, [locale, seed, likes, reviews, resetBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        locale={locale}
        setLocale={setLocale}
        seed={seed}
        setSeed={setSeed}
        likes={likes}
        setLikes={setLikes}
        reviews={reviews}
        setReviews={setReviews}
      />

      <main className="max-w-7xl mx-auto p-4">
        <BookTable
          books={books}
          loading={loading}
          error={error}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
};

export default App;
