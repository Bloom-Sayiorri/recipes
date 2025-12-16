import React from "react";
import { TbRotateClockwise } from "react-icons/tb";

function Loading() {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<div className="animate-spin">
				<TbRotateClockwise size={25} />
			</div>
			<p className="text-3xl">Loading...</p>
		</div>
	);
}

export default Loading;