import { BsStarHalf, BsStarFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

function Card({ recipe }) {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	return (
		<div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group w-full">
			{recipe._id ? (
				<div className=" shadow-lg shadow-black w-full">
					<img src={recipe.recipe_thumb} alt={recipe.recipe_name} className="" />
					<h2 className="text-center p-1">{recipe.recipe_name}</h2>
					<div className="flex gap-10 pl-4">
						<div className="text-yellow-400 flex items-center justify-center mx-auto">
							<BsStarFill />
							<BsStarFill />
							<BsStarFill />
							<BsStarFill />
							<BsStarHalf />
						</div>
						{user && (
							<div
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									fetch("http:localhost:3000/recipes", {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
											Accept: "application/json",
										},
										body: JSON.stringify({
											user_id: user.id,
											recipe_id: recipe.id,
										}),
									}).then((response) => {
										if (response.status < 400) {
											navigate("/");
										}
									});
								}}
								className="absolute top-5 right-2 text-red-800">
								<FaHeart size={32} />
							</div>
						)}
					</div>
					<div className="p-3">
						<button
							onClick={() => navigate(`/viewmeal/${recipe.id}`)}
							className="border w-1/2 mx-auto block p-3 bg-orange-600">
							View More
						</button>
					</div>
					<div className="flex gap-1">
						<button className="border w-1/2 mx-auto block p-2 my-1 bg-green-400">Update</button>
						<button className="border w-1/2 mx-auto block p-2 my-1 bg-red-600">Delete</button>
					</div>
				</div>
			) : (
				<div className="max-w-md p-2 flex flex-col">
					<div className="animate-pulse">
						<div className="h-32 w-full bg-black/50"></div>
						<div className="h-4 bg-black/50 w-[90%] mx-auto my-1"></div>
						<div className="flex gap-3">
							<div className="h-3 bg-black/50 w-1/2"></div>
							<div className="h-3 bg-black/50 w-1/2"></div>
						</div>
						<div className="h-4 bg-black/50 w-[90%] mx-auto my-1"></div>`
					</div>
				</div>
			)}
			{/* {admin && (
				<div className="mt-1 ml-4 shadow-lg shadow-black justify-end border border-white flex gap-3">
					<div className="flex items-center">
						<div>
							<RiEdit2Line />
						</div>
						<button className="btn-btn">
							<Link to={`/update/${recipe.id}`}>Update</Link>
						</button>
					</div>
					<div className="flex items-center">
						<div>
							<RiDeleteBinLine />
						</div>
						<button
							onClick={deleteRecipe}
							id={recipe.id}
							className="border  px-2 text-center rounded-lg">
							Delete
						</button>
					</div>
				</div>
			)} */}
		</div>
	);
}

export default Card;