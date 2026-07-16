// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Search from "./Search";
// import { NavLink, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { IoMdRestaurant } from "react-icons/io";
// import { HiMenu, HiX } from "react-icons/hi";

// function Navbar({ search, handleSearch }) {

// 	const { user } = useContext(AuthContext);
// 	const navigate = useNavigate();

// 	const [menuOpen, setMenuOpen] = useState(false);

// 	function handleDashboards() {
// 		if (user?.admin) {
// 			navigate("/admins");
// 		} else {
// 			navigate("/user");
// 		}
// 	}

// 	const logout = () => localStorage.clear();

// 	const handleOnclick = () => {
// 		Swal.fire({
// 			icon: "success",
// 			title: "Logout successfully",
// 			confirmButtonText: "OK",
// 		}).then(() => {
// 			logout();
// 			window.location.href = "/";
// 		});
// 	};

// 	function handleAddFavorites() {
// 		navigate("/");
// 		document.querySelector("#favorite")?.scrollIntoView({
// 			behavior: "smooth",
// 		});
// 	}

// 	return (
// 		<header className="bg-white drop-shadow-md sticky top-0 z-50">
// 			<div className="flex justify-between items-center p-1.5 sm:p-4">
// 				<NavLink to="/" className="text-black text-3xl flex items-center gap-2">
// 					<IoMdRestaurant size={40} className="text-orange-600" />
// 					<span className="font-bold">Recipe-Share</span>
// 				</NavLink>

// 				<div className="hidden md:block">
// 					<Search search={search} handleSearch={handleSearch} />
// 				</div>

// 				<button className="md:hidden text-3xl text-orange-600" onClick={() => setMenuOpen(!menuOpen)}>
// 					{menuOpen ? <HiX /> : <HiMenu />}
// 				</button>

// 				<nav className="hidden md:flex">
// 					<ul className="flex gap-4 items-center justify-center text-base font-semibold">
// 						<NavLink to="/" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 							Home
// 						</NavLink>
// 						<NavLink to="/recipes" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 							Recipes
// 						</NavLink>

// 						{user ? (
// 							<>
// 								<button
// 									onClick={handleAddFavorites}
// 									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Favorite Recipes
// 								</button>

// 								<NavLink to="/addrecipe" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Add Recipe
// 								</NavLink>

// 								<button
// 									onClick={handleDashboards}
// 									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Welcome, {user?.username}
// 								</button>

// 								<button
// 									onClick={handleOnclick}
// 									className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Logout
// 								</button>
// 							</>
// 						) : (
// 							<>
// 								<NavLink to="/signup" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Sign Up
// 								</NavLink>

// 								<NavLink to="/login" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Login
// 								</NavLink>

// 								<NavLink to="/about" className="text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									About
// 								</NavLink>
// 							</>
// 						)}
// 					</ul>
// 				</nav>
// 			</div>

// 			{/* Mobile Menu (drawer) */}
// 			{menuOpen && (
// 				<div className="md:hidden bg-white drop-shadow-lg rounded-lg p-4">
// 					<div className="mb-3">
// 						<Search search={search} handleSearch={handleSearch} />
// 					</div>

// 					<ul className="flex flex-col gap-3 text-base font-semibold">
// 						<NavLink
// 							to="/recipes"
// 							className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
// 							onClick={() => setMenuOpen(false)}>
// 							Recipes
// 						</NavLink>

// 						{user ? (
// 							<>
// 								<button
// 									onClick={() => {
// 										handleAddFavorites();
// 										setMenuOpen(false);
// 									}}
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
// 									Favorite Recipes
// 								</button>

// 								<NavLink
// 									to="/addrecipe"
// 									onClick={() => setMenuOpen(false)}
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
// 									Add Recipe
// 								</NavLink>

// 								<button
// 									onClick={() => {
// 										handleDashboards();
// 										setMenuOpen(false);
// 									}}
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
// 									Welcome, {user?.username}
// 								</button>

// 								<button
// 									onClick={handleOnclick}
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md text-left">
// 									Logout
// 								</button>
// 							</>
// 						) : (
// 							<>
// 								<NavLink
// 									to="/signup"
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
// 									onClick={() => setMenuOpen(false)}>
// 									Sign Up
// 								</NavLink>

// 								<NavLink
// 									to="/login"
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
// 									onClick={() => setMenuOpen(false)}>
// 									Login
// 								</NavLink>

// 								<NavLink
// 									to="/about"
// 									className="p-2 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md"
// 									onClick={() => setMenuOpen(false)}>
// 									About
// 								</NavLink>
// 							</>
// 						)}
// 					</ul>
// 				</div>
// 			)}
// 		</header>
// 	);
// }

// export default Navbar;

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Search from "./Search";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdRestaurant } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ search, handleSearch }) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	function handleDashboards() {
		if (user?.admin) navigate("/admins");
		else navigate("/user");
	}

	const logout = () => localStorage.clear();

	const handleOnclick = () => {
		Swal.fire({
			icon: "success",
			title: "Logged out",
			confirmButtonText: "OK",
			confirmButtonColor: "#ea580c",
		}).then(() => {
			logout();
			window.location.href = "/";
		});
	};

	function handleAddFavorites() {
		navigate("/");
		document.querySelector("#favorite")?.scrollIntoView({ behavior: "smooth" });
	}

	// const linkClass =
	// 	"relative text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full";

	// const activeLinkClass =
	// 	"relative text-sm font-medium text-orange-600 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-orange-500";

	return (
		<>
			<style>{`
				.nav-pill {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 7px 16px;
					border-radius: 9999px;
					font-weight: 600;
					transition: background 0.18s, color 0.18s, box-shadow 0.18s;
					cursor: pointer;
					border: none;
					text-decoration: none;
				}
				.nav-pill-ghost {
					background: transparent;
					color: #4b5563;
				}
				.nav-pill-ghost:hover {
					background: #fff7ed;
					color: #ea580c;
				}
				.nav-pill-ghost.active-pill {
					background: #fff7ed;
					color: #ea580c;
				}
				.nav-pill-primary {
					background: #ea580c;
					color: #fff;
					box-shadow: 0 2px 8px rgba(234,88,12,0.25);
				}
				.nav-pill-primary:hover {
					background: #c2410c;
					box-shadow: 0 4px 14px rgba(234,88,12,0.35);
				}
				.nav-pill-outline {
					background: transparent;
					color: #ea580c;
					border: 1.5px solid #ea580c;
				}
				.nav-pill-outline:hover {
					background: #ea580c;
					color: #fff;
				}
				.mobile-link {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 10px 12px;
					border-radius: 10px;
					font-size: 0.9rem;
					font-weight: 600;
					color: #374151;
					text-decoration: none;
					transition: background 0.15s, color 0.15s;
					cursor: pointer;
					background: transparent;
					border: none;
					width: 100%;
					text-align: left;
				}
				.mobile-link:hover, .mobile-link.active-mobile {
					background: #fff7ed;
					color: #ea580c;
				}
				.logo-icon-wrap {
					width: 38px; height: 38px;
					border-radius: 10px;
					background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
					display: flex; align-items: center; justify-content: center;
					box-shadow: 0 2px 8px rgba(234,88,12,0.3);
				}
				.search-wrap input {
					background: #f9fafb;
					border: 1.5px solid #e5e7eb;
					border-radius: 9999px;
					padding: 7px 16px 7px 38px;
					font-size: 0.85rem;
					outline: none;
					transition: border-color 0.2s, box-shadow 0.2s;
					width: 200px;
				}
				.search-wrap input:focus {
					border-color: #ea580c;
					box-shadow: 0 0 0 3px rgba(234,88,12,0.1);
					width: 240px;
				}
				.drawer-divider {
					height: 1px;
					background: #f3f4f6;
					margin: 8px 0;
				}
				.avatar-chip {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					padding: 5px 12px 5px 6px;
					border-radius: 9999px;
					background: #fff7ed;
					color: #ea580c;
					font-size: 0.8rem;
					font-weight: 700;
					cursor: pointer;
					border: none;
					transition: background 0.15s;
				}
				.avatar-chip:hover { background: #ffedd5; }
				.avatar-circle {
					width: 26px; height: 26px;
					border-radius: 50%;
					background: linear-gradient(135deg, #ea580c, #f97316);
					color: #fff;
					font-size: 0.7rem;
					font-weight: 800;
					display: flex; align-items: center; justify-content: center;
				}
			`}</style>

			<header
				className={`sticky top-0 z-50 transition-all duration-300 ${
					scrolled ? "bg-[rgba(255,255,255,0.97)]" : "bg-[#ffffff]"
				} ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)] " : "shadow-[0_1px_0_#f3f4f6]"} ${
					scrolled ? "backdrop-blur-[12px]" : "backdrop-blur-none"
				} `}>
				<div className="max-w-[1200px] m-[0_auto] p-[0_5px] h-[64px] flex items-center justify-between gap-[16px]">
					{/* Logo */}
					<NavLink to="/" className="flex items-center gap-[10px] no-underline shrink-[0]">
						<div className="logo-icon-wrap">
							<IoMdRestaurant size={20} color="#fff" />
						</div>
						<span className="font-jakarta font-bold text-[1.5rem] text-[#111827] tracking-[-0.02em]">
							Recipiez<span style={{ color: "#ea580c" }}>Share</span>
						</span>
					</NavLink>

					{/* Desktop Search */}
					<div className="hidden md:block search-wrap" style={{ position: "relative" }}>
						<svg
							style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
							width="16"
							height="16"
							fill="none"
							stroke="#374151"
							strokeWidth="2"
							viewBox="0 0 24 24">
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" />
						</svg>
						<Search search={search} handleSearch={handleSearch} />
					</div>

					{/* Desktop Nav */}
					<nav className="hidden lg:flex" style={{ alignItems: "center", gap: "4px" }}>
						<NavLink to="/" className={({ isActive }) => `nav-pill nav-pill-ghost${isActive ? " active-pill" : ""}`}>
							Home
						</NavLink>
						<NavLink
							to="/recipes"
							className={({ isActive }) => `nav-pill nav-pill-ghost${isActive ? " active-pill" : ""}`}>
							Recipes
						</NavLink>

						{user ? (
							<>
								<button onClick={handleAddFavorites} className="nav-pill nav-pill-ghost">
									Favourites
								</button>
								<NavLink
									to="/addrecipe"
									className={({ isActive }) => `nav-pill nav-pill-ghost${isActive ? " active-pill" : ""}`}
									style={{ marginLeft: "4px" }}>
									+ Add Recipe
								</NavLink>
								<button onClick={handleDashboards} className="avatar-chip" style={{ marginLeft: "4px" }}>
									<div className="avatar-circle">{user?.username?.[0]?.toUpperCase() ?? "U"}</div>
									{user?.username}
								</button>
								<button onClick={handleOnclick} className="nav-pill nav-pill-outline" style={{ marginLeft: "4px" }}>
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink to="/about" className="nav-pill nav-pill-ghost">
									About
								</NavLink>
								<NavLink to="/signup" className="nav-pill nav-pill-outline" style={{ marginLeft: "4px" }}>
									Sign Up
								</NavLink>
								<NavLink to="/login" className="nav-pill nav-pill-primary" style={{ marginLeft: "4px" }}>
									Login
								</NavLink>
							</>
						)}
					</nav>

					{/* Mobile burger */}
					<button
						className="flex items-center border-none border-r-[8px] cursor-pointer text-[#ea580c] lg:hidden "
						onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
					</button>
				</div>

				{/* Mobile Drawer */}
				{menuOpen && (
					<div
						className="lg:hidden"
						style={{
							background: "#fff",
							borderTop: "1px solid #f3f4f6",
							padding: "12px 20px 20px",
							boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
						}}>
						{/* Mobile Search */}
						<div className="search-wrap" style={{ position: "relative", marginBottom: "12px" }}>
							<svg
								style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
								width="16"
								height="16"
								fill="none"
								stroke="#374151"
								strokeWidth="2"
								viewBox="0 0 24 24">
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
							<Search search={search} handleSearch={handleSearch} />
						</div>

						<div className="drawer-divider" />

						<ul
							style={{
								listStyle: "none",
								margin: 0,
								padding: 0,
								display: "flex",
								flexDirection: "column",
								gap: "2px",
							}}>
							<li>
								<NavLink to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
									🏠 Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/recipes" className="mobile-link" onClick={() => setMenuOpen(false)}>
									🍽️ Recipes
								</NavLink>
							</li>

							{user ? (
								<>
									<li>
										<button
											className="mobile-link"
											onClick={() => {
												handleAddFavorites();
												setMenuOpen(false);
											}}>
											❤️ Favourite Recipes
										</button>
									</li>
									<li>
										<NavLink to="/addrecipe" className="mobile-link" onClick={() => setMenuOpen(false)}>
											Add Recipe
										</NavLink>
									</li>
									<div className="drawer-divider" />
									<li>
										<button
											className="mobile-link"
											onClick={() => {
												handleDashboards();
												setMenuOpen(false);
											}}>
											👤 {user?.username}'s Dashboard
										</button>
									</li>
									<li>
										<button className="mobile-link" style={{ color: "#ef4444" }} onClick={handleOnclick}>
											🚪 Logout
										</button>
									</li>
								</>
							) : (
								<>
									<li>
										<NavLink to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>
											ℹ️ About
										</NavLink>
									</li>
									<div className="drawer-divider" />
									<li>
										<NavLink to="/signup" className="mobile-link" onClick={() => setMenuOpen(false)}>
											✨ Sign Up
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/login"
											onClick={() => setMenuOpen(false)}
											style={{
												display: "flex",
												alignItems: "center",
												gap: "10px",
												padding: "10px 12px",
												borderRadius: "10px",
												background: "#ea580c",
												color: "#fff",
												fontWeight: 700,
												fontSize: "0.9rem",
												textDecoration: "none",
												marginTop: "4px",
											}}>
											🔑 Login
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				)}
			</header>
		</>
	);
}

export default Navbar;
