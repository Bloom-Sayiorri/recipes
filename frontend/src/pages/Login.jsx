import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
	// const{login}=useContext(AuthContext)
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		// send Data to rails
		e.preventDefault();

		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ username: username, password: password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError("You are not allowed to log in");
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "You are not allowed to log in!",
					});
				} else {
					localStorage.setItem("jwt", data.jwt);
					localStorage.setItem("user", data.user.username);
					localStorage.setItem("admin", data.user.admin);
					localStorage.setItem("userID", data.user.id);

					if (data) {
						navigate("/home");
					} else {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Wrong names or password!",
						});
					}
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Welcome to Recipe-Share!",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};
	return (
		<div className="bg-gray-50 min-h-screen flex items-center justify-center">
			<div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-20">
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
								onChange={(e) => setUsername(e.target.value)}
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
								onChange={(e) => setPassword(e.target.value)}
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
								disabled={!password || !username}
								className="w-full bg-[#0C54BF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed">
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
		</div>
	);
};

export default Login;

