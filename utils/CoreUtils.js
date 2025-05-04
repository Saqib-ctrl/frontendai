// src/utils/core-utils.js

const OBJECT_TYPES = {
  USER: 'users',
  PROFILE: 'profiles'
};

class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

// Simulated data backend
async function fetchData(type) {
  const data = localStorage.getItem(type);
  const items = data ? JSON.parse(data) : [];
  return { items };
}

async function createData(type, objectData) {
  const data = localStorage.getItem(type);
  const items = data ? JSON.parse(data) : [];

  const newItem = {
    objectId: Date.now().toString(),
    objectData
  };

  items.push(newItem);
  localStorage.setItem(type, JSON.stringify(items));

  return newItem;
}

async function updateData(type, objectId, updatedData) {
  const data = localStorage.getItem(type);
  let items = data ? JSON.parse(data) : [];

  items = items.map(item => 
    item.objectId === objectId ? { ...item, objectData: updatedData } : item
  );

  localStorage.setItem(type, JSON.stringify(items));
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const CoreUtils = {
  OBJECT_TYPES,
  AppError,
  fetchData,
  createData,
  updateData,
  validateEmail
};

export default CoreUtils;
