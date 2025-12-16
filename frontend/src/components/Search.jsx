import { BiSearchAlt2 } from "react-icons/bi";

function Search({ search, handleSearch }) {
	return (
		<div className="flex items-center w-max">
			<label htmlFor="search" className="flex justify-center items-center gap-1 border border-slate-300 rounded-xl px-2 py-3 w-full">
				<input type="text" id="search" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search recipe..." className="focus:outline-none" />
				<span role="button" className="text-2xl cursor-pointer">
					<BiSearchAlt2 role="icon" className="text-slate-500" />
				</span>
			</label>
		</div>
	);
}
export default Search;