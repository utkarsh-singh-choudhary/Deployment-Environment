// Simple client-side auth for admin panel
// Credentials are hardcoded for this demo
const ADMIN_USER = 'primetechify';
const ADMIN_PASS = 'PrimeTechify@2024';
const AUTH_KEY = 'primetechify_admin_session';

export function loginAdmin(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}
