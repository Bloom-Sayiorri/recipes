export default function errorMiddleware(err, req, res, next) {
	console.error(err.stack);

	let statusCode = err.statusCode || 500;
	let message = err.message || "Server error.";

	//Mongoose bad OnjectId
	if (err.name === "CastError") {
		statusCode = 400;
		message = "Resource not found.";
	}

	// Mongoose validation error
	if (err.name === "ValidationError") {
		statusCode = 400;
		message = Object.values(err.errors)
			.map((val) => val.message)
			.join(", ");
	}

	res.status(statusCode).json({
		success: false,
		error: message,
	});
}

