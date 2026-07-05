import React, { useEffect, useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { useParams } from "react-router-dom";

const Share = () => {
	const frontendUrl = window.location.origin;
	const apiUrl = process.env.REACT_APP_NODE_API_URL;
	const { id } = useParams();
	const [isSocialMediaVisible, setSocialMediaVisible] = useState(false);
	const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		fetch(`${apiUrl}/recipes/${id}`)
		.then((res) => res.json())
		.then((data) => setRecipe(data.data))
	}, [id, apiUrl]);

	const title = recipe?.recipe_name || "a recipe";

	const handleShareClick = () => {
		setSocialMediaVisible(!isSocialMediaVisible);
		setSelectedSocialMedia("");
	};

	const handleSocialMediaClick = (socialMedia) => {
		setSelectedSocialMedia(socialMedia);
	};

	const handleShare = () => {
		let recipeUrl = `${frontendUrl}/viewmeal/${id}`;
		const title = recipe?.recipe_name || "a recipe";
		const message = encodeURIComponent(`Check out "${title}" on Recipe Share: ${recipeUrl}`);
		let shareUrl = "";

		switch (selectedSocialMedia) {
			case "whatsapp":
				shareUrl = `https://wa.me/?text=${message}`;
				break;
			case "twitter":
				shareUrl = `https://twitter.com/intent/tweet?text=${message}`;
				break;
			case "facebook":
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`;
				break;
			default:
				break;
		}

		window.open(shareUrl, "_blank");
	};

	return (
		<div className="p-4">
			<button onClick={handleShareClick} className="flex items-center gap-2">
				<IoMdShareAlt /> Share
			</button>
			<div className="flex gap-5">
				{isSocialMediaVisible && (
					<div className="flex flex-row gap-5 mb-5 mt-5">
						<button onClick={() => handleSocialMediaClick("whatsapp")}>
							<AiOutlineWhatsApp />
						</button>
						<button onClick={() => handleSocialMediaClick("twitter")}>
							<FaTwitter />
						</button>
						<button onClick={() => handleSocialMediaClick("facebook")}>
							<FaFacebook />
						</button>
					</div>
				)}
				{selectedSocialMedia && recipe && (
					<button onClick={handleShare} className="border-l border-black p-1">
						Share {title} on {selectedSocialMedia.toUpperCase()}
					</button>
				)}
			</div>
		</div>
	);
};

export default Share;