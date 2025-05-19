"use client";

// Константи для ключів localStorage
const CLICK_COUNT_KEY = 'monad-clicker-clicks';

// Функція для отримання кількості кліків з localStorage
export const getClickCount = (): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  const savedCount = localStorage.getItem(CLICK_COUNT_KEY);
  return savedCount ? parseInt(savedCount, 10) : 0;
};

// Функція для збереження кількості кліків в localStorage
export const saveClickCount = (count: number): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(CLICK_COUNT_KEY, count.toString());
}; 