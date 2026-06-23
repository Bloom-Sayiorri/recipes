import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineBackward } from "react-icons/ai";

function UserDashboard() {
	const url = process.env.REACT_APP_NODE_API_URL;

	const { user, setUser, token } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	const userId = user?.id;

	useEffect(() => {
		if (user?.email) {
			setEmail(user.email);
		}
	}, [user]);

	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${url}/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ email }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Failed to update profile");
			}

			setUser(data.user);
			localStorage.setItem("user", JSON.stringify(data.user));
			setIsUpdating(false);

			// If you have updateUser in AuthContext,
			// call it here instead.
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = () => {
		setIsUpdating(false);
		setEmail(user?.email || "");
	};

	const renderForm = () => (
		<form onSubmit={handleUpdate} className="mx-auto my-10 max-w-lg">
			<div className="mb-4">
				<label htmlFor="username" className="block text-gray-600 font-bold mb-2">
					Username
				</label>

				<input
					type="text"
					id="username"
					value={user?.username || ""}
					readOnly
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="email" className="block text-gray-600 font-bold mb-2">
					Email
				</label>

				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
				/>
			</div>

			<div className="flex items-center justify-between">
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Save
				</button>

				<button
					type="button"
					onClick={handleCancel}
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
					Cancel
				</button>
			</div>
		</form>
	);

	const renderDetails = () => (
		<div className="mx-auto my-10 max-w-lg border-t border-gray-200 pt-4">
			<h2 className="text-3xl font-semibold mb-4">Welcome, {user?.username}</h2>

			<hr className="my-4" />

			<div className="flex items-center justify-between">
				<p className="text-gray-600">Username:</p>
				<p className="text-gray-900">{user?.username}</p>
			</div>

			<hr className="my-4" />

			<div className="flex items-center justify-between">
				<p className="text-gray-600">Email:</p>
				<p className="text-gray-900">{user?.email}</p>
			</div>

			<div className="flex justify-between">
				<Link to="/" className="text-black hover:text-orange-500 mt-5 flex items-center gap-1">
					<AiOutlineBackward size={20} />
					Back Home
				</Link>
			</div>

			<div className="flex gap-3 mt-4">
				<button
					onClick={() => setIsUpdating(true)}
					className="bg-orange-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded">
					Update Profile
				</button>

				<NavLink to="/addrecipe" className="bg-orange-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded">
					Create a Recipe
				</NavLink>

				{user?.admin && (
					<NavLink to={"/allusers"} className="bg-orange-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded">
						All Users
					</NavLink>
				)}
			</div>
		</div>
	);

	if (!user?.id) {
		return <div>Loading...</div>;
	}

	return <div className="userdashboard">{isUpdating ? renderForm() : renderDetails()}</div>;
}

export default UserDashboard;