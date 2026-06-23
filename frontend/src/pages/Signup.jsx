import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Signup = () => {
	const navigate = useNavigate();
	const { signup } = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
		admin: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.currentTarget;
		setUserData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			signup(userData);
			Swal.fire({
				icon: "success",
				title: "Logged in successfully",
			});
			navigate("/login");
		} catch (error) {
			console.error(error.message);

			Swal.fire({
				icon: "error",
				title: "Error logging in",
				text: error.message,
			});
			setError(error.message);
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen flex items-center justify-center">
			<div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-20">
				<div className="sm:block hidden w-full">
					<h2 className="font-bold text-2xl text-center">Sign Up</h2>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div>
							<label htmlFor="username" className="block text-black text-lg font-bold mb-2">
								Username
							</label>
							<input
								type="text"
								name="username"
								value={userData.username}
								required
								className="shadow appearance-none border border-[#160194] rounded-md w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="John Doe"
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-black text-lg font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={userData.email}
								required={true}
								className="shadow appearance-none border border-[#160194] rounded-md w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="example@mail.com"
								onChange={handleChange}
							/>
						</div>
						<div className="mt-1">
							<label htmlFor="password" className="block text-back text-lg font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={userData.password}
								required={true}
								className="shadow appearance-none border border-[#160194] rounded-md w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="password"
								onChange={handleChange}
							/>
						</div>
						<div className="cursor-not-allowed">
							<label htmlFor="admin" className="block text-black text-lg font-bold mb-2">
								Admin
							</label>
							<div className="shadow appearance-none border border-[#160194] rounded-md w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline">
								<label htmlFor="admin" className="flex items-center gap-2">
									<input
										id="admin"
										type="checkbox"
										checked={userData.admin}
										onChange={handleChange}
										// disabled={true}
										className="cursor-not-allowed pt-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									Are you an admin?
								</label>
							</div>
						</div>
						<div className="flex items-center flex-col gap-5">
							<button
								disabled={!userData.username || !userData.email || !userData.password}
								className="w-full bg-[#0C54BF] hover:bg-blue-900 text-white font-bold py-2 px-12 rounded-md focus:outline-none focus:shadow-outline disabled:bg-red-600 disabled:cursor-not-allowed disabled:line-through">
								Sign Up
							</button>
							<h6 className="">
								Already have an account?{" "}
								<Link
									to="/login"
									className="inline-block align-baseline font-bold text-sm text-[#160194] hover:text-blue-800">
									Login
								</Link>
							</h6>
						</div>
					</form>
				</div>
			</div>
			<p className="font-bold text-red-500 text-lg">{error}</p>
		</div>
	);
};

export default Signup;