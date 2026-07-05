import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
	user: null,
	token: null,
	login: () => {},
	logout: () => {},
	signup: () => {},
});

const AuthProvider = ({ children }) => {
	const url = process.env.REACT_APP_NODE_API_URL;
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const navigate = useNavigate();

	const logout = useCallback(() => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		setToken(null);
		navigate("/login");
	}, [navigate]);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		let storedUser = null;

		try {
			storedUser = JSON.parse(localStorage.getItem("user"));
		} catch (err) {
			storedUser = null;
		}
		if(!storedToken || !storedUser) return;
		try {
			const decoded = jwtDecode(storedToken);

			if (decoded.exp * 1000 <= Date.now()) {
				logout();
				return;
			}

			setToken(storedToken);
			setUser(storedUser);
		} catch (error) {
			logout();
		}
	}, [logout]);

	useEffect(() => {
		if (!token) return;

		const decoded = jwtDecode(token);

		const expiresAt = decoded.exp * 1000;
		const timeRemaining = expiresAt - Date.now();

		if (timeRemaining <= 0) {
			logout();
			return;
		}

		const timer = setTimeout(() => {
			logout();
		}, timeRemaining);

		return () => clearTimeout(timer);
	}, [token, logout]);

	const signup = async (userData) => {
		const res = await fetch(`${url}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || data.error || "Signup failed");
		}

		setUser(data.user);

		if (data.token) {
			setToken(data.token);
			localStorage.setItem("token", data.token);
		}

		localStorage.setItem("user", JSON.stringify(data.user));
	};

	async function loginUser(username, password) {
		const response = await fetch(`${url}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await response.json();

		if (!response.ok || data.authorized === false) {
			throw new Error(data.message || "Invalid username or password");
		}

		return {
			user: data.data.user,
			token: data.data.token,
		};
	}

	const login = async (username, password) => {
		const { user, token } = await loginUser(username, password);

		setUser(user);
		setToken(token);

		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));

		return user;
	};

	return <AuthContext.Provider value={{ user, setUser, token, login, logout, signup }}>{children}</AuthContext.Provider>;
};





export default AuthProvider;