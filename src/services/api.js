export const API_URL = 'https://fintrack-backend-wnf9.onrender.com/api';

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Login failed');
    return data;
};

export const registerUser = async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Registration failed');
    return data;
};

export const fetchTransactions = async (userId) => {
    const res = await fetch(`${API_URL}/transactions/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
};

export const addTransaction = async (userId, transaction) => {
    const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...transaction })
    });
    if (!res.ok) throw new Error('Failed to add transaction');
    return res.json();
};

export const fetchLoans = async (userId) => {
    const res = await fetch(`${API_URL}/loans/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch loans');
    return res.json();
};

export const addLoan = async (userId, loan) => {
    const res = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...loan })
    });
    if (!res.ok) throw new Error('Failed to add loan');
    return res.json();
};
