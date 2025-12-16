export default function Page() {
	return (
		<ul className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
			{/* {recipesList} */}
			<li
				key={recipe.id}
				aria-label="Recipe list"
				className="border-none rounded-lg mb-3 shadow-[0_3px_3px_1px_rgba(0,0,0,0.25)]">
				<article className="relative flex flex-col h-full sm:h-3/4 md:h-[70%]">
					{isFavorited ? (
						<FcLike
							role="button"
							onClick={() => toggleFavorite(recipe)}
							className="absolute h-6 w-6 hover:ring-amber-50"
							style={{ cursor: "pointer" }}
						/>
					) : (
						<HeartIcon
							role="button"
							onClick={() => toggleFavorite(recipe)}
							className="absolute text-orange-500 h-6 w-6 hover:ring-amber-50"
							style={{ cursor: "pointer" }}
						/>
					)}

					<img src={recipe.image} alt={recipe.name} className="object-cover rounded-t-lg w-full sm:object-cover" />
					<section className="text-slate-600/80 flex flex-col justify-center items-center font-[500]">
						<p className="text-base text-center sm:text-xl">{recipe.name}</p>
						<p className="text-[.99rem] sm:text-lg">{recipe.cuisine}</p>
						<div className="flex items-center justify-center gap-2">
							<p className="text-sm">{"⭐".repeat(Math.round(recipe.rating))}</p>
							<p>{recipe.rating?.toFixed(1)}</p>
						</div>
						<NavLink
							to={`/recipes/${recipe.id}`}
							onClick={() => console.log()}
							className="bg-slate-100/90 text-orange-500 px-3 py-[6px] rounded-lg mt-1 mb-2 hover:bg-orange-400 hover:text-white hover:ring-2 hover:ring-white">
							View recipe
						</NavLink>
					</section>
				</article>
			</li>
		</ul>
	);
}
