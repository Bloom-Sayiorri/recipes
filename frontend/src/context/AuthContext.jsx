import React, { createContext, useState, useEffect } from "react";

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

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedToken && storedUser) {
			setUser(storedUser);
			setToken(storedToken);
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		setToken(null);
	};

	const signup = async (userData) => {
		if (!userData.email || !userData.password) {
			console.log("signup function executed with userData:", userData);
			throw new Error("Email and password are required.");
		}
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
			user: data.user,
			token: data.token,
		};
	}

	const login = async (username, password) => {
		const { user, token } = await loginUser(username, password);

		setUser(user);
		setToken(token);

		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("admin", user.admin);

		return user;
	};

	return <AuthContext.Provider value={{ user, token, login, logout, signup }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;