import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Share from "./pages/Share";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddRecipeForm from "./pages/AddRecipeForm";
import AdminDashboard from "./pages/AdminDashboard";
import SubmittedRecipes from "./pages/SubmittedRecipes";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [search, setSearch] = useState("");
	function handleSearch(value) {
		setSearch(value);
	}

	return (
		<div className="App h-screen flex flex-col">
			<Navbar search={search} handleSearch={handleSearch} />
			<div className="grow">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/recipes" element={<LandingPage search={search} />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/admins" element={<AdminDashboard />} />
						<Route path="/viewmeal/:id" element={<RecipeDetailPage />} />
						<Route path="/share" element={<Share />} />
						<Route path="/addrecipe" element={<AddRecipeForm />} />
						<Route path="/submitted" element={<SubmittedRecipes />} />
						<Route path="/user" element={<UserDashboard />} />
						<Route path="/allusers" element={<Users />} />
					</Route>
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;