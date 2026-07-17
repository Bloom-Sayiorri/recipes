import app from "./app.js";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

app.get("/", (req, res, next) => {
	res.send("Hello, World!");
})

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server running on port ${PORT}`);
});