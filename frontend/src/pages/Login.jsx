import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Login() {
	const { login } = useContext(AuthContext);
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		admin: false,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { username, password } = userData;
			const res = await login(username, password);
			Swal.fire({
				icon: "success",
				title: `Welcome ${username}`,
				timer: 1500,
			});
			if (!res) {
				throw new Error("Error logging in!");
			} else {
				navigate("/");
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Invalid login credentials!",
				text: error.message,
			});
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
			<div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-20">
				<div className="sm:block hidden w-full">
					<h2 className="font-bold text-2xl text-center">Login</h2>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="mb-4">
							<label htmlFor="username" className="block text-black text-lg font-bold mb-2">
								Username
							</label>
							<input
								type="text"
								name="username"
								onChange={handleChange}
								className="p-2 rounded-xl border"
								placeholder="John Doe"
							/>
						</div>
						<div className="mb-3 mt-4">
							<label htmlFor="password" className="block text-black text-lg font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								onChange={handleChange}
								className="p-2 rounded-xl border"
								placeholder=" password"
							/>
						</div>
						<div className="flex items-center flex-col gap-5">
							<a
								href="#signup"
								className="inline-block align-baseline font-bold text-sm text-[#160194] hover:text-blue-800 mb-2">
								Forgot Password?
							</a>
							<button
								disabled={!userData.password || !userData.username}
								className="w-full bg-[#0C54BF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-red-600 disabled:cursor-not-allowed disabled:line-through">
								Login
							</button>
							<h6>
								Don't have an account?
								<Link
									to="/signup"
									className="inline-block align-baseline font-bold text-sm text-[#160194] hover:text-blue-800">
									Signup
								</Link>
							</h6>
						</div>
					</form>
				</div>
			</div>
			{/* <p className="font-bold text-red-500 text-lg">{error}</p> */}
		</div>
	);
}

export default Login;