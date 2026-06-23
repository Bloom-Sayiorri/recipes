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

	// Optional: block non-admins
	if (!user?.admin) {
		return <h2 className="m-4 text-red-500">Unauthorized</h2>;
	}

	return (
		<div className="ml-4 my-4">
			<div className="grid grid-cols-3 text-orange-600 items-center">
				<h2>Username</h2>
				<h2>Email</h2>
				<h2 className="text-center">User Type</h2>
			</div>

			{users.map((u) => (
				<div key={u.id} className="grid grid-cols-3 my-3 items-center">
					<h2>{u.username}</h2>
					<h2>{u.email}</h2>
					<input type="checkbox" checked={u.admin} readOnly />
				</div>
			))}
		</div>
	);
}

export default Users;