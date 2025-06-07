import { useState, useCallback } from 'react';

export const useBookCovers = () => {
  const [covers, setCovers] = useState({});

  const generateCover = useCallback(
    (book) => {
      const coverKey = `${book.isbn}-${book.title}`;
      if (covers[coverKey]) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 300;

      const seed = book.isbn.replace(/[^0-9]/g, '');
      const hue1 = (parseInt(seed.substring(0, 3)) || 180) % 360;
      const hue2 = (hue1 + 60) % 360;

      const gradient = ctx.createLinearGradient(0, 0, 200, 300);
      gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
      gradient.addColorStop(1, `hsl(${hue2}, 70%, 40%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 300);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 50; i++) {
        const x = (parseInt(seed.substring(i % seed.length)) || 50) % 200;
        const y = (parseInt(seed.substring((i + 1) % seed.length)) || 50) % 300;
        ctx.fillRect(x, y, 2, 2);
      }

      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';

      const title =
        book.title.length > 30
          ? book.title.substring(0, 30) + '...'
          : book.title;
      const words = title.split(' ');
      let y = 50;

      for (let i = 0; i < words.length; i += 2) {
        const line = words.slice(i, i + 2).join(' ');
        ctx.fillText(line, 100, y);
        y += 25;
        if (y > 150) break;
      }

      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      const author =
        book.author.length > 25
          ? book.author.substring(0, 25) + '...'
          : book.author;
      ctx.fillText(author, 100, 250);

      const coverUrl = canvas.toDataURL();

      setCovers((prev) => ({
        ...prev,
        [coverKey]: coverUrl,
      }));
    },
    [covers]
  );

  const getCover = useCallback(
    (book) => {
      const coverKey = `${book.isbn}-${book.title}`;
      return covers[coverKey];
    },
    [covers]
  );

  return { getCover, generateCover };
};
