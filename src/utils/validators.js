// backend/src/utils/validators.js

/**
 * Validate VIT student email
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid VIT email
 */
export const isValidVITEmail = (email) => {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;
    return regex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password meets requirements
 */
export const isValidPassword = (password) => {
    if (!password) return false;
    return password.length >= 8;
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} - True if username meets requirements
 */
export const isValidUsername = (username) => {
    if (!username) return false;
    return username.length >= 3 && username.length <= 30;
};

/**
 * Validate email format (basic)
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};