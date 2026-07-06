import Card from "./Card";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Pagination from "../components/Pagination";

export default function Recipes({ search }) {
	const url = process.env.REACT_APP_NODE_API_URL;
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [search, setSearch] = useState("");
	// function handleSearch(value) {
	// 	setSearch(value);
	// }
	const [searchBy, setSearchBy] = useState("recipe_name");
	const itemsPerPage = 9;
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		fetch(`${url}/recipes`)
			.then((response) => response.json())
			.then((data) => {setRecipes(data.data); setLoading(false)});
	}, [url]);

	function organizePages(data, perPage) {
		let temp = [];
		for (let i = 0; i < data.length; i += perPage) {
			temp.push(data.slice(i, i + perPage));
		}
		return temp;
	}

	let filteredRecipe = recipes;
	if (recipes.length > 0) {
		filteredRecipe = organizePages(
			recipes.filter((recipe) => {
				return recipe[searchBy].toLowerCase().includes(search.toLowerCase());
			}),
			itemsPerPage
		);
	} else {
		return []
	}

	function handleChange(e) {
		setSearchBy(e.target.value);
	}
	if (loading) return <Loading text="Fetching recipes..." />;

	return (
		<div className="h-full">
			<div className="mt-2 flex justify-end w-full gap-3 mr-6">
				<div className="flex gap-2">
					<label>Search by:</label>
					<select value={searchBy} onChange={handleChange}>
						<option value="recipe_name">Name</option>
						<option value="country_of_origin">Country of origin</option>
						{/* <option  value="ratings">Ratings</option> */}
						<option value="ingredients">Ingredients</option>
						<option value="number_of_people_served">Number of people served</option>
					</select>
				</div>
			</div>
			<>
				{/* to be replaced by : filteredRecipe */}
				{filteredRecipe.length === 0 ? (
					<Loading text="Fetching recipes..." />
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 place-content-stretch md:w-full mx-auto p-2">
						{filteredRecipe.length > 0 &&
							filteredRecipe[currentPage].map((recipe, index) => {
								return <Card key={index} recipe={recipe} />;
							})}
					</div>
				)}
			</>
			<Pagination totalPages={filteredRecipe.length} currentPage={currentPage} onPageChange={setCurrentPage} />
		</div>
	);
}