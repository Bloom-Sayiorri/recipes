import app from "./app.js";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server running on port ${PORT}`);
});