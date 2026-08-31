const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return email.length <= 320 && EMAIL_PATTERN.test(email);
}

export function isValidLoginPassword(password: string) {
  return password.length > 0 && password.length <= 1024;
}
