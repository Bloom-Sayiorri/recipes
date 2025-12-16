import { useEffect, useState } from "react";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import recipe from "../images/recipe.jpg";

function HomePage() {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5500/api/favorites?_limit=10")
			.then((res) => res.json())
			.then((data) => {
				setFavorites(data);
				// console.log(data);
			})
			.catch((err) => console.error("Error fetching favorites:", err));
	}, []);

	return (
		<div className="w-full">
			<div className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
				<img src={recipe} alt="hero" className="w-full h-full object-cover" />

				<div className="absolute inset-0 bg-black/50"></div>

				<div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
					<h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg">Join Recipe-Share</h1>

					<p className="mt-4 text-lg sm:text-2xl max-w-3xl font-light drop-shadow-md">
						Thousands of recipes. Endless inspiration. Discover our suggestions and get inspired to create amazing
						dishes.
					</p>

					<NavLink
						to="/signup"
						className="mt-6 bg-orange-600 px-6 py-3 rounded-md font-semibold text-white hover:bg-orange-700 transition">
						TRY IT FOR FREE
					</NavLink>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-12">
				<h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Favorites</h2>

				{favorites.length === 0 ? (
					<p className="text-center text-gray-500 text-lg">No favorites yet. Add some recipes to your favorites!</p>
				) : (
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 shadow-md justify-center gap-2">
						{favorites.map((favorite, index) => {
							return <Card key={index} recipe={favorite.recipe} />;
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default HomePage;