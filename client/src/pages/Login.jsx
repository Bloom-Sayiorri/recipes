import React from "react";

function Login() {
	const loginUser = (e) => {
		e.preventDefault();
	};
	return (
		<div>
			<form onSubmit={loginUser}>
				<label>Email</label>
				<input type="email" placeholder="enter email..." />
				<label>Password</label>
				<input type="password" placeholder="enter password..." />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Login;
