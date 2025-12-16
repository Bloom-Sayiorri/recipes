import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineBackward } from 'react-icons/ai'


function UserDashboard() {
  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);


  const userType = localStorage.getItem("user");
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    fetch("/me", {
      method: "GET",
      headers :{
        'Content-Type': 'application/json',
        Authorization : 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then((res) => res.json())
      .then((data) => {
      //  console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[token]);

// console.log(userId);


  function handleUpdate(e){
    e.preventDefault()
    fetch(`/users/${userId}`,{
      method: "PATCH",
      headers :{
        'Content-Type': 'application/json',
        Authorization : 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({email:email})
    }).then(res=>res.json())
    .then(data=>{
     // console.log(data)
      setUser(data)
      setIsUpdating(false)
    })
  }



  const handleCancel = () => {
    setIsUpdating(false);

     setEmail(user.email);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleUpdate} className="mx-auto my-10 max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-bold mb-2">
            Username
          </label>
          <input
            type="text"

            name="username"
            value={user.username}

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-600 font-bold mb-2">
            Email
          </label>
          <input
            type="email"

            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const renderDetails = () => {
    return (
      <div className="mx-auto my-10 max-w-lg border-t border-gray-200 pt-4">
        <h2 className="text-3xl font-semibold mb-4">Welcome, {userType}</h2>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Name:</p>
          <p className="text-gray-900">{user?.username}</p>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-600">Email:</p>
          <p className="text-gray-900">{user?.email}</p>
        </div>
        <div className="flex justify-between">

            <a href="/home" className="text-black hover:text-orange-500 mt-5 flex items-center gap-1">  <AiOutlineBackward size={20}/> Back Home</a>
        </div>
        <div className="flex gap-3">
        <button
            onClick={() => setIsUpdating(true)}
            className="bg-orange-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
          <NavLink className="block mt-4 bg-orange-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded[mt-4] focus:outline-none focus:shadow-outline" to='/addrecipe'>Create a recipe</NavLink>
          <NavLink className="block mt-4 bg-orange-500 hover:bg-slate-300  text-white font-bold py-2 px-4 rounded[mt-4] focus:outline-none focus:shadow-outline" to='/#favorite'>Favorites </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className="userdashboard">

      {isUpdating ? renderForm() : renderDetails()}
    </div>
  );
}

export default UserDashboard;
