import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoMdRestaurant } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import Search from "./Search";

function Navbar({ search, handleSearch }) {
	const user = localStorage.getItem("user");
	const role = localStorage.getItem("admin");
	const navigate = useNavigate();

	const [menuOpen, setMenuOpen] = useState(false);

	function handleDashboards() {
		if (role + "" === true + "") {
			navigate("/admins");
		} else {
			navigate("/user");
		}
	}

	const logout = () => localStorage.clear();

	const handleOnclick = () => {
		Swal.fire({
			icon: "success",
			title: "Logout successfully",
			confirmButtonText: "OK",
		}).then(() => {
			logout();
			window.location.href = "/";
		});
	};

	function handleAddFavorites() {
		navigate("/");
		document.querySelector("#favorite")?.scrollIntoView({
			behavior: "smooth",
		});
	}

	return (
		<header className="bg-white drop-shadow-md sticky top-0 z-50">
			<div className="flex justify-between items-center p-1.5 sm:p-4">
				<NavLink to="/" className="text-black text-3xl flex items-center gap-2">
					<IoMdRestaurant size={40} className="text-orange-600" />
					<span className="font-bold">Recipe-Share</span>
				</NavLink>

				<div className="hidden md:block">
					<Search search={search} handleSearch={handleSearch} />
				</div>

				<button className="md:hidden text-3xl text-orange-600" onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <HiX /> : <HiMenu />}
				</button>

				<nav className="hidden md:flex">
					<ul className="flex gap-4 items-center justify-center text-base font-semibold">
						<NavLink to="/" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
							Home
						</NavLink>
						<NavLink to="/recipes" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
							Recipes
						</NavLink>

						{user ? (
							<>
								<button
									onClick={handleAddFavorites}
									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Favorite Recipes
								</button>

								<NavLink
									to="/addrecipe"
									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Add Recipe
								</NavLink>

								<button
									onClick={handleDashboards}
									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									{user}
								</button>

								<button
									onClick={handleOnclick}
									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink to="/signup" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Sign Up
								</NavLink>

								<NavLink to="/login" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Login
								</NavLink>

								<NavLink to="/about" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									About
								</NavLink>
							</>
						)}
					</ul>
				</nav>
			</div>

			{/* Mobile Menu (drawer) */}
			{menuOpen && (
				<div className="md:hidden bg-white drop-shadow-lg rounded-lg p-4">
					<div className="mb-3">
						<Search search={search} handleSearch={handleSearch} />
					</div>

					<ul className="flex flex-col gap-3 text-base font-semibold">
						<NavLink
							to="/recipes"
							className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
							onClick={() => setMenuOpen(false)}>
							Recipes
						</NavLink>

						{user ? (
							<>
								<button
									onClick={() => {
										handleAddFavorites();
										setMenuOpen(false);
									}}
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
									Favorite Recipes
								</button>

								<NavLink
									to="/addrecipe"
									onClick={() => setMenuOpen(false)}
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
									Add Recipe
								</NavLink>

								<button
									onClick={() => {
										handleDashboards();
										setMenuOpen(false);
									}}
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
									{user}
								</button>

								<button
									onClick={handleOnclick}
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink
									to="/signup"
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
									onClick={() => setMenuOpen(false)}>
									Sign Up
								</NavLink>

								<NavLink
									to="/login"
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
									onClick={() => setMenuOpen(false)}>
									Login
								</NavLink>

								<NavLink
									to="/about"
									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
									onClick={() => setMenuOpen(false)}>
									About
								</NavLink>
							</>
						)}
					</ul>
				</div>
			)}
		</header>
	);
}

export default Navbar;