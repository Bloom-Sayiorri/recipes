import React from "react";
import image1 from "../image1.jpg";

function About() {
	return (
		<div className="container mx-auto mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
			<div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-10">
				<div>
					<h1 className="text-2xl font-bold mb-4">
						<div className="flex flex-col justify-center items-center">
							<span className="text-black">Recipe Sharing</span>
							<span className="text-orange-600 ">Made Easy</span>
						</div>
					</h1>
					<p className="text-lg mb-4">
						Our recipe-sharing app allows you to organize your
						favorite recipes in a digital recipe book, making it
						easy to access them from anywhere, share them with
						others, and keep them all in one convenient location.
					</p>
					<p className="text-lg mb-4">
						With our app, you can share your culinary creations with
						anyone, whether it's a family member, friend, or fellow
						food lover. And if you're looking for new recipes to
						try, you can join groups and discover new recipes shared
						by other users.
					</p>
					<p className="text-lg">
						Sign up today and start sharing your favorite recipes
						with the world!
					</p>
				</div>
				<div className="flex flex-col justify-center items-center">
					<button
						type="button"
						className="rounded-full bg-orange-600 hover:bg-slate-300 text-white font-bold py-2 px-4">
						Get Recipe Share App
					</button>
				</div>
			</div>
			<div className="bg-white shadow-md rounded-md p-6">
				<img
					src={image1}
					alt="Recipe"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}

export default About;
