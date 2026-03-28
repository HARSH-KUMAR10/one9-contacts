const API_URL = "/api/v1";

export const apiClient = {
  async get(endpoint) {
    const token = localStorage.getItem("auth_token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    return response.json();
  },

  async post(endpoint, data) {
    const token = localStorage.getItem("auth_token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put(endpoint, data) {
    const token = localStorage.getItem("auth_token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(endpoint) {
    const token = localStorage.getItem("auth_token");
    const headers = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return response.json();
  },
};
