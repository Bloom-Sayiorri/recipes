import React from "react";
import { TbRotateClockwise } from "react-icons/tb";

function Loading({text}) {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<div className="animate-spin">
				<TbRotateClockwise size={25} />
			</div>
			<p className="text-4xl">{text}</p>
		</div>
	);
}

export default Loading;