export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6; 
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/; 
  return phoneRegex.test(phone);
};

export const validateRequiredFields = (...fields) => {
  return fields.every(field => field.trim() !== '');
};
