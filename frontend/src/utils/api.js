const API_URL = "/api/v1";

const handleResponse = async (response) => {
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || `API Error: ${response.status}`);
  }
  return json;
};

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
    return handleResponse(response);
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
    return handleResponse(response);
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
    return handleResponse(response);
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
    return handleResponse(response);
  },
};
