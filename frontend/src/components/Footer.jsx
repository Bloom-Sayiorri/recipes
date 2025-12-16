import { NavLink } from "react-router-dom";
import { MdCopyright } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
	return (
		<footer className="bg-black text-white w-full px-6 py-10">
			<div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
				<h4 className="text-2xl md:text-3xl font-semibold">Get in touch with us</h4>
				<h5 className="text-md md:text-lg text-gray-300">Reach us on any of these platforms.</h5>
				<ul className="flex gap-6 mt-4 flex-wrap justify-center">
					<li>
						<NavLink className="flex items-center gap-2 hover:text-gray-400">
							<FaTwitter size={22} />
							<span className="text-sm md:text-base">Twitter</span>
						</NavLink>
					</li>

					<li>
						<NavLink className="flex items-center gap-2 hover:text-gray-400">
							<FaFacebook size={22} />
							<span className="text-sm md:text-base">Facebook</span>
						</NavLink>
					</li>

					<li>
						<NavLink className="flex items-center gap-2 hover:text-gray-400">
							<FaInstagram size={22} />
							<span className="text-sm md:text-base">Instagram</span>
						</NavLink>
					</li>
				</ul>
			</div>

			<hr className="border-gray-700 my-8" />

			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
				<div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
					<MdCopyright />
					<span>2023 Recipe-Share</span>
				</div>
				<ul className="flex gap-6 text-sm md:text-base">
					<li>
						<NavLink to="/about" className="hover:text-gray-400">
							About Us
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact" className="hover:text-gray-400">
							Contact Us
						</NavLink>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;