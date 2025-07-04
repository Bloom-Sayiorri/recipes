import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
	return (
		<main className="text-blue-400">
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</main>
	);
}

export default App;
