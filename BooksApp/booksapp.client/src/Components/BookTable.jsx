import React, { useState, useCallback } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useBookCovers } from '../hooks/useBookCovers';
import TableHeader from './TableHeader';
import BookDetails from './BookDetails';
import LoadingIndicator from './LoadingIndicator';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import EndOfListMessage from './EndOfListMessage';
import DesktopBookTable from '../Resolution/DesktopBookTable';
import TabletBookTable from '../Resolution/TabletBookTable';
import MobileBookCards from '../Resolution/MobileBookCards';

const BookTable = ({
  books = [],
  loading = false,
  error = null,
  onLoadMore = () => {},
  hasMore = false,
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const { generateCover } = useBookCovers();
  const loadingRef = useInfiniteScroll(onLoadMore, hasMore, loading);

  const toggleExpanded = useCallback((index) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const commonProps = {
    books,
    expandedRows,
    toggleExpanded,
    generateCover,
  };

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <TableHeader booksCount={books.length} />

      <DesktopBookTable {...commonProps} />
      <TabletBookTable {...commonProps} />
      <MobileBookCards {...commonProps} />

      {loading && <LoadingIndicator />}
      {hasMore && !loading && books.length > 0 && (
        <div ref={loadingRef} className="h-4"></div>
      )}
      {!hasMore && books.length > 0 && (
        <EndOfListMessage booksCount={books.length} />
      )}
      {!loading && books.length === 0 && !error && <EmptyState />}
    </div>
  );
};

export default BookTable;
