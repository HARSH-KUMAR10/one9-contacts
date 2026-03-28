import { writable } from "svelte/store";

export const auth = writable({
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("auth_token") || null,
  email: localStorage.getItem("auth_email") || null,
});

export const loading = writable(false);
export const error = writable(null);

export const setAuth = (token, user, email) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_email", email);
  auth.set({
    isAuthenticated: true,
    user,
    token,
    email,
  });
};

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_email");
  auth.set({
    isAuthenticated: false,
    user: null,
    token: null,
    email: null,
  });
};
