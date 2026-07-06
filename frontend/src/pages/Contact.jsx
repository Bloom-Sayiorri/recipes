import React, { useState } from "react";
import image1 from "../images/image1.jpg";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

function Contact() {
	const url = process.env.REACT_APP_NODE_API_URL;
	const [change, setChange] = useState({
		fullname: "",
		email: "",
		comment: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.currentTarget;
		setChange((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${url}/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(change),
			});

			const data = await res.json();

			console.log(data);

			setChange({
				fullname: "",
				email: "",
				comment: "",
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto mt-8 grid md-w-3/4 grid-cols-1 md:grid-cols-2 w-3/4 ">
			<div className="bg-white drop-shadow-2xl shadow-md rounded-tl-lg rounded-bl-lg flex flex-col gap-5 items-center justify-center h-3/4 w-full">
				<div className="flex flex-col mb-4 justify-center items-center">
					<h1 className="text-orange-600 text-4xl font-bold ">Contact Info</h1>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col">
						<label htmlFor="fullname">Full-Name</label>
						<input
							type="text"
							name="fullname"
							id="fullname"
							onChange={handleChange}
							value={change.fullname}
							placeholder="Enter your full-name..."
							className="form-input"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={handleChange}
							value={change.email}
							placeholder="Enter your email..."
							className="form-input"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="comment">Comment</label>
						<textarea
							name="comment"
							id="comment"
							onChange={handleChange}
							value={change.comment}
							placeholder="Enter your comments..."
							rows="6"
							cols="50"
							className="form-input"></textarea>
					</div>
					<button
						type="submit"
						className="bg-orange-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:text-orange-600 hover:bg-white hover:font-bold active:bg-orange-700 focus:ring-2 focus:ring-orange-600">
						Submit
					</button>
				</form>
				<div className="mt-8">
					<h3 className="text-orange-600 font-bold text-xl">You can also follow us on our socials</h3>
					<div className="flex gap-12 justify-end mt-2">
						<div className="flex gap-2 items-center">
							<FaFacebook size={32} className="text-blue-700" />
							Facebook
						</div>
						<div className="flex gap-2 items-center">
							<FaInstagram size={32} className="text-purple-500" />
							Instagram
						</div>
						<div className="flex gap-2 items-center">
							<FaTwitter size={32} className="text-sky-400" />
							Twitter
						</div>
					</div>
				</div>
			</div>
			<img src={image1} alt="Recipe" className="w-full h-3/4 object-cover rounded-tr-lg rounded-br-lg" />
		</div>
	);
}

export default Contact;