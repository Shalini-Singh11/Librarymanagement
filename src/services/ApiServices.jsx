const BASE_URL = "http://localhost:8080";


const apiService = {
  get: (url) => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json' 
    };
    return fetch(`${BASE_URL}/${url}`, { 
        method : "GET"
        , headers });
  },
  post: (url, data) => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json' 
    };
    return fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
  },
  put: (url, data) => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json' 
    };
    return fetch(`${BASE_URL}/${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  },
  delete: (url) => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json' 
    };
    return fetch(`${BASE_URL}/${url}`, {
      method: 'DELETE',
      headers
    });
  },
  update: (url, data) => {
    const token = localStorage.getItem("Token");
    const headers = {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json' 
    };
    return fetch(`${BASE_URL}/${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  },
};

export default apiService;
