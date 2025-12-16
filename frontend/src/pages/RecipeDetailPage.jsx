import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoPin } from "react-icons/go";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

import Share from "./Share";
import ReviewsForm from "./ReviewsForm";

// import { AuthContext } from "../context/AuthContext";

function RecipeDetailPage() {
	const [recipe, setRecipe] = useState(null);
	const [reviews, setReviews] = useState([]);
	const { token } = useContext(AuthContext);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:5500/api/recipes/${id}`)
			.then((res) => res.json())
			.then((data) => setRecipe(data));
	}, [id]);

	function postReviews(reviewsFormData) {
		fetch("http://localhost:5500/api/reviews", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			body: JSON.stringify(reviewsFormData),
		})
			.then((response) => response.json())
			.then((data) => {
				setReviews([...reviews, data]);
			});
	}

	let ingredients = [],
		instructions = [];
	if (recipe) {
		ingredients = recipe.ingredients?.split("\r\n") || [];
		instructions = recipe.instructions?.split("\r\n") || [];
	}

	function handleClick() {
		document.querySelector("#ratings").scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	}

	function deleteRecipe() {
		fetch(`/recipes/${id}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			res.json();
			if (res.status === 204) {
				Swal.fire({
					title: "Your have successfully deleted the recipe",
					icon: "success",
					timer: 2000,
				});
				navigate("/home");
			} else {
				Swal.fire({
					title: "There was an error deleting the recipe",
					icon: "error",
					timer: 2000,
				});
			}
		});
	}

	return (
		<div className="flex-grow flex flex-col bg-slate-200">
			<button onClick={() => navigate(-1)} className="border-none bg-orange-500 rounded-lg text-white px-3 py-2 w-fit">
				Go Back
			</button>
			{recipe ? (
				<>
					<div className="p-4 grid  md:grid-cols-2 gap-4">
						<div className="flex flex-col">
							<h3 className="font-bold text-[2em] text-center text-orange-600">{recipe.recipe_name}</h3>
							<div className="border-b border-orange-500 w-3/4 my-2 mx-auto"></div>
							<h4 className="font-bold text-xl text-center text-orange-700">
								{recipe.country_of_origin} - {recipe.recipe_category}
							</h4>
							<div className="flex-grow flex flex-col items-center justify-center p-6">
								<img className="rounded-lg" src={recipe.recipe_thumb} alt={recipe.strMeal} />
							</div>
							<div className=" rounded my-4 bg-slate-100  flex items-center gap-2">
								<Share />
								{/* <div className="py-1  px-4 text-sm flex items-center gap-4"><BsShareFill /> Share</div>
		                    <div className="grid grid-cols-3 gap-4 w-max text-xl py-2 px-6">
		                        <button className="hover:text-orange-500"><RiWhatsappFill /></button>
		                        <button className="hover:text-orange-500"><BsFacebook /></button>
		                        <button className="hover:text-orange-500"><BsTwitter /></button>
		                    </div> */}
								<div className="flex items-center gap-2 border rounded-lg p-2 bg-slate-200">
									<button
										onClick={() => {
											fetch(`http://localhost:3000/favorites`, {
												method: "POST",
												headers: {
													"Content-Type": "application/json",
													Accept: "application/json",
													Authorization: `Bearer ${localStorage.getItem("jwt")}`,
												},
												body: JSON.stringify({
													user_id: localStorage.getItem("userID"),
													recipe_id: id,
												}),
											}).then((response) => {
												if (response.status < 400) {
													response.json().then((data) => {
														navigate("/home");
													});
												} else if (response.status === 401) {
												} else {
												}
											});
										}}
										className="">
										Add to favorites
									</button>
									<BsFillHeartFill className="text-red-500" />
								</div>
								<div onClick={handleClick} className="flex items-center gap-2 border rounded-lg p-2 bg-slate-200">
									<button className="">Rate</button>
									<BsStarFill className="text-yellow-500" />
								</div>
								<div className="flex items-center">
									<div>
										<RiDeleteBinLine />
									</div>
									<button onClick={deleteRecipe} id={recipe.id} className="border  px-2 text-center rounded-lg">
										Delete
									</button>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center flex-col">
							<h2 className="text-center my-2 font-bold text-orange-500">Ingredients</h2>
							<div className="grid grid-cols-3 gap-4">
								{ingredients.map((ingredient, index) => {
									const [ingr, measure] = ingredient.split("|");
									return (
										<div key={index} className="flex items-center p-2 bg-slate-100 shadow-lg flex-col rounded">
											<div className="grid grid-cols-2 gap-2 items-center">
												<img
													className="w-24"
													src={`https://www.themealdb.com/images/ingredients/${ingr}-small.png`}
													alt={ingr}
												/>
												<p className="text-sm">{ingr}</p>
											</div>
											<div className="text-sm">Quantity: {measure}</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="p-4">
						<h3>{recipe.description}</h3>
					</div>
					<div className="grid md:grid-cols-2 items-center pb-8 px-4">
						<div className="mb-6">
							<h2 className="text-center my-2 font-bold text-orange-500 text-xl">Instructions</h2>
							<div>
								{instructions.map((instr, index) => {
									return (
										<div key={index}>
											{instr.length > 0 && (
												<>
													<div className="flex items-center my-2 p-1 w-[90%] mx-auto">
														<span className="font-bold text-orange-600 mx-4">
															<GoPin />
														</span>
														{instr}
													</div>
													<div className="border-b border-orange-500 w-[80%] mx-auto"></div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
						<iframe
							className="rounded"
							width="100%"
							height="480"
							src={`https://www.youtube.com/embed/${recipe.youtube_code}`}
							title={recipe.recipe_name}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen></iframe>
					</div>
					` `
					<div id="ratings" className="my-8 grid grid-cols-1 md:grid-cols-2">
						<ReviewsForm postReviews={postReviews} id={id} />
						<div>
							{reviews.map((review, index) => {
								return (
									<div key={index}>
										<h2>{review.ratings}</h2>
										<h2>{review.comments}</h2>
									</div>
								);
							})}
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
}

export default RecipeDetailPage;