import React, { useState } from "react";
import image1 from "../image1.jpg";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

function Contact() {
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

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		// <div className="container mx-auto mt-8 mb-8 grid md-w-3/4 grid-cols-1 md:grid-cols-2 w-3/4">
		// 	<div className="bg-white drop-shadow-2xl shadow-md rounded-md p-6 flex flex-col gap-10 w-full">
		// 		<div>
		// 			<h1 className="text-2xl font-bold mb-4">
		// 				<div className="flex flex-col justify-center items-center">
		// 					<span className="text-orange-600">Contact Info</span>
		// 				</div>
		// 			</h1>
		// 		</div>
		// 		<div>
		// 			<div>
		// 				<div className="flex items-center gap-2 mb-8">
		// 					<div>
		// 						<FaMapMarkerAlt size={26} className="text-orange-500" />
		// 					</div>
		// 					<p>Ngong' Road Lane</p>
		// 					<p>P.O. BOX 233, NAIROBI</p>
		// 				</div>
		// 				<div className="flex items-center gap-2 my-8">
		// 					<div>
		// 						<BsEnvelopePaper size={26} className="text-orange-500" />
		// 					</div>
		// 					<p>recipeshare@gmail.com</p>
		// 				</div>
		// 				<div className="flex items-center gap-2 my-8">
		// 					<div>
		// 						<BsTelephoneInbound size={26} className="text-orange-500" />
		// 					</div>
		// 					<p>001 200000000000</p>
		// 				</div>
		// 				<div className="flex items-center gap-2 my-8">
		// 					<div>
		// 						<FaMobileAlt size={26} className="text-orange-500" />
		// 					</div>
		// 					<p>+2547 42064943</p>
		// 				</div>
		// 				<div className="flex gap-12 justify-end mt-72 ">
		// 					<div className="flex gap-2 items-center">
		// 						<FaFacebook size={32} className="text-blue-700" />
		// 						Facebook
		// 					</div>
		// 					<div className="flex gap-2 items-center">
		// 						<FaInstagram size={32} className="text-purple-500" />
		// 						Instagram
		// 					</div>
		// 					<div className="flex gap-2 items-center">
		// 						<FaTwitter size={32} className="text-sky-400" />
		// 						Twitter
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<img src={image1} alt="Recipe" className="w-full h-full object-cover" />
		// </div>

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
							type="text"
							name="comment"
							id="comment"
							onChange={handleChange}
							value={change.comment}
							placeholder="Enter your comments..."
							rows="6"
							cols="50"
							className="form-input"></textarea>
					</div>
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