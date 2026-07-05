import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineBackward } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

function UserDashboard() {
	const url = process.env.REACT_APP_NODE_API_URL;

	const { user, setUser, token } = useContext(AuthContext);

	const [email, setEmail] = useState(user?.email || "");
	const [avatar, setAvatar] = useState(user?.avatar || "");
	const [isUpdating, setIsUpdating] = useState(false);

	const userId = user?.id;

	useEffect(() => {
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
	}, [user])

	async function handleUpdate(e) {
		e.preventDefault();

		try {
			const response = await fetch(`${url}/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ email, avatar }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to update profile");
			}

			setUser(data.user);
			localStorage.setItem("user", JSON.stringify(data.user));

			setIsUpdating(false);
		} catch (error) {
			console.error(error);
		}
	}

	function handleCancel() {
		setEmail(user?.email || "");
		setAvatar(user?.avatar || "");
		setIsUpdating(false);
	}

	function renderForm() {
		return (
			<form onSubmit={handleUpdate} className="mx-auto my-10 max-w-lg">
				<div className="mb-4">
					<label className="block text-gray-600 font-bold mb-2">Username</label>
					<input
						type="text"
						value={user?.username || ""}
						disabled
						className="shadow appearance-none border rounded w-full py-2 px-3"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-600 font-bold mb-2">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-600 font-bold mb-2">Avatar</label>
					<input
						type="text"
						value={avatar}
						onChange={(e) => setAvatar(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3"
					/>
				</div>

				<div className="flex gap-3">
					<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
						Save
					</button>

					<button type="button" onClick={handleCancel} className="bg-gray-500 text-white py-2 px-4 rounded">
						Cancel
					</button>
				</div>
			</form>
		);
	}

	function renderDetails() {
		return (
			<div className="mx-auto my-10 max-w-lg border-t border-gray-200 pt-4">
				<h2 className="text-3xl font-semibold mb-4">Welcome, {user?.username}</h2>
				<div className="">
					{user?.avatar && (
						<img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full object-cover mb-4" />
					)}
				</div>
				<hr className="my-4" />

				<div className="flex justify-between">
					<p className="text-gray-600">Name:</p>
					<p>{user?.username}</p>
				</div>

				<hr className="my-4" />

				<div className="flex justify-between">
					<p className="text-gray-600">Email:</p>
					<p>{user?.email}</p>
				</div>

				<div className="flex justify-between">
					<Link to="/" className="text-black hover:text-orange-500 mt-5 flex items-center gap-1">
						<AiOutlineBackward size={20} />
						Back Home
					</Link>
				</div>

				<div className="flex gap-3">
					<button onClick={() => setIsUpdating(true)} className="bg-orange-500 text-white py-2 px-4 rounded mt-4">
						Update Profile
					</button>

					<NavLink to="/addrecipe" className="bg-orange-500 text-white py-2 px-4 rounded mt-4">
						Create a Recipe
					</NavLink>

					<NavLink to="/favorites" className="bg-orange-500 text-white py-2 px-4 rounded mt-4">
						Favorites
					</NavLink>
				</div>
			</div>
		);
	}

	return <div className="userdashboard">{isUpdating ? renderForm() : renderDetails()}</div>;
}

export default UserDashboard;