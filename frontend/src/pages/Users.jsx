// import React, { useState, useEffect } from "react";

// function Users() {
// 	const [users, setUsers] = useState([]);

// 	useEffect(() => {
// 		fetch(`${url}/users`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				setUsers(data);
// 			});
// 	}, []);

// 	const handleCheckboxChange = async (userId, admin) => {
// 		// setIsAdmin(event.target.checked);
// 		try {
// 			const res = await fetch(`${url}/users/${userId}`, {
// 				method: "PATCH",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ admin }),
// 			});

// 			const data = await res.json();

// 			setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, admin } : user)));
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<div className="ml-4 my-4 ">
// 			<div className="grid grid-cols-3 text-orange-600 items-center">
// 				<h2>Username</h2>
// 				<h2>Email</h2>
// 				<h2 className="text-center">UserType</h2>
// 			</div>
// 			{users.map((user, index) => {
// 				return (
// 					<div key={index} className="grid grid-cols-3 my-3 items-center">
// 						<h2>{user.username}</h2>
// 						<h2>{user.email}</h2>
// 						<input
// 							type="checkbox"
// 							checked={user.admin}
// 							onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
// 						/>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export default Users;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Users() {
	const url = process.env.REACT_APP_NODE_API_URL;

	const { user } = useContext(AuthContext);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`${url}/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			})
			.catch((err) => console.error("Error fetching users:", err));
	}, [url]);

	useEffect(() => {
		if (user && !user.admin) {
			Swal.fire({
				icon: "error",
				title: "Access Denied",
				html: `
				<p><strong>Unauthorized request.</strong></p>
				<p>You must be an administrator to perform this action.</p>
			`,
				confirmButtonText: "OK",
				confirmButtonColor: "#3085d6",
				allowOutsideClick: false,
				allowEscapeKey: true,
			});
		}
	}, [user]);

	// Optional: block non-admins
	if (!user?.admin) {
		return (
			<div className="flex flex-col h-full items-cetner justify-center">
				<h1 className="text-center text-4xl text-red-500 font-bold">You are not authorized to view this resource!</h1>;
			</div>
		);
	}

	return (
		<div className="ml-4 my-4">
			<div className="grid grid-cols-4 text-orange-600 items-center">
				<h2>Avatar</h2>
				<h2>Username</h2>
				<h2>Email</h2>
				<h2>User Type</h2>
			</div>

			{users.map((u, index) => (
				<div key={index} className="grid grid-cols-4 my-3 items-center">
					<img
						src={u.avatar}
						alt={u.username}
						className="object-cover border order-none rounded-full"
						width={20}
						height={20}
					/>
					<h2>{u.username}</h2>
					<h2>{u.email}</h2>
					<label className="flex flex-col items-start">
						<input className="" type="checkbox" checked={u.admin} readOnly />
					</label>
				</div>
			))}
		</div>
	);
}

export default Users;

