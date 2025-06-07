import React from 'react';

const Header = ({
  locale,
  setLocale,
  seed,
  setSeed,
  likes,
  setLikes,
  reviews,
  setReviews,
  onReset,
}) => {
  const generateRandomSeed = () => {
    setSeed(Math.random().toString(36).substring(2, 15));
  };

  return (
    <header className="bg-white shadow-sm border-b p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Book Generator</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Language & Region
            </label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="en">English (US)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ja">日本語 (JP)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Seed</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Enter seed"
              />
              <button
                onClick={generateRandomSeed}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hidden md:hidden lg:block"
              >
                🎲
              </button>
            </div>
          </div>
          <div className="md:ml-auto md:mr-auto lg:ml-0 lg:mr-0">
            <label className="block text-sm font-medium mb-2">
              Avg Likes: {likes}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={likes}
              onChange={(e) => setLikes(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Avg Reviews
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={reviews}
              onChange={(e) => setReviews(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
