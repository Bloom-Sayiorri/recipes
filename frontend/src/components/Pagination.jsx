import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
	const pageNumbers = [];
	// Determine the starting and ending pages to show
	let startPage = Math.max(currentPage - 2, 0);
	let endPage = Math.min(startPage + 4, totalPages - 1);
	if (endPage - startPage < 4) {
		startPage = Math.max(endPage - 4, 0);
	}
	// Add ellipsis if necessary
	if (startPage > 0) {
		pageNumbers.push(-1);
	}
	// Add page numbers
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}
	if (endPage < totalPages - 1) {
		pageNumbers.push(-1);
	}
	return (
		<nav className="my-10 font-bold">
			<ul className="flex justify-center gap-2">
				{currentPage > 0 && (
					<li className="text-blue-900 cursor-pointer" onClick={() => onPageChange(currentPage - 1)}>
						Previous
					</li>
				)}
				{pageNumbers.map((pageNumber, index) => (
					<React.Fragment key={index}>
						{pageNumber === -1 ? (
							<li className="text-blue-900">...</li>
						) : (
							<li
								className={`rounded-full text-sm hover:ring-1 flex items-center justify-center w-6 h-6 ${
									pageNumber === currentPage ? "text-blue-900 bg-white ring-1 ring-blue-900" : "text-blue-900"
								} cursor-pointer`}
								onClick={() => onPageChange(pageNumber)}>
								{pageNumber + 1}
							</li>
						)}
					</React.Fragment>
				))}
				{currentPage < totalPages - 1 && (
					<li className="text-blue-900 cursor-pointer" onClick={() => onPageChange(currentPage + 1)}>
						Next
					</li>
				)}
			</ul>
		</nav>
	);
}