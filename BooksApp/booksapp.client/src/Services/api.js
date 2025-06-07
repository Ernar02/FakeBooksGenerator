const API_BASE_URL = '/Books';

const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(`Request failed: ${error.message}`);
  }
};

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
};

export const fetchBooks = async (seed, page, locale, likes, reviews) => {
  if (!seed || seed.trim() === '') {
    throw new Error('Seed parameter is required');
  }

  if (!page || page < 1) {
    throw new Error('Page must be a positive number');
  }

  if (!locale || locale.trim() === '') {
    throw new Error('Locale parameter is required');
  }

  if (likes < 0 || reviews < 0) {
    throw new Error('Likes and reviews must be non-negative');
  }

  const queryParams = {
    seed: seed.trim(),
    page: page,
    locale: locale.trim(),
    likes: likes,
    reviews: reviews,
  };

  const queryString = buildQueryString(queryParams);
  const url = `${API_BASE_URL}/GetBooks?${queryString}`;

  try {
    console.log(`Fetching books: ${url}`);
    const books = await apiRequest(url);

    if (!Array.isArray(books)) {
      throw new Error('Server response is not an array');
    }

    return books;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
  }
};

export const fetchBookDetails = async (bookId) => {
  if (!bookId) {
    throw new Error('Book ID is required');
  }

  const url = `${API_BASE_URL}/Books/${bookId}`;

  try {
    const bookDetails = await apiRequest(url);
    return bookDetails;
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    throw error;
  }
};

export const generateRandomSeed = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch (DE)', flag: '🇩🇪' },
  { code: 'ja', name: '日本語 (JP)', flag: '🇯🇵' },
];

export const getLocaleInfo = (localeCode) => {
  return SUPPORTED_LOCALES.find((locale) => locale.code === localeCode) || null;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const DEFAULT_CONFIG = {
  seed: 'default',
  page: 1,
  locale: 'en',
  likes: 3.5,
  reviews: 2.0,
  pageSize: {
    first: 20,
    subsequent: 10,
  },
};

export const ApiService = {
  fetchBooks,
  fetchBookDetails,
  generateRandomSeed,
  getLocaleInfo,
  debounce,
  SUPPORTED_LOCALES,
  DEFAULT_CONFIG,
};
