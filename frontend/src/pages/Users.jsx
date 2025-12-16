import React, { useState,useEffect } from 'react'

function Users() {
    const [users, setUsers] =useState([])
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() =>{
        fetch('https://recipe-share-k3tx.onrender.com/users',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then((data) =>{
            setUsers(data);
        })
      })

      const handleCheckboxChange = (event) => {
        setIsAdmin(event.target.checked);
      };

  return (
    <div className='ml-4 my-4 '>
         <div className='grid grid-cols-3 text-orange-600 items-center'>
            <h2>Username</h2>
            <h2>Email</h2>
            <h2 className='text-center'>UserType</h2>
        </div>
        {users.map((user, index) => {
            return (
                <div key={index} className='grid grid-cols-3 my-3 items-center'>
                    <h2>{user.username}</h2>
                    <h2>{user.email}</h2>
                    <input type="checkbox" checked={user.isAdmin} onChange={handleCheckboxChange} />
                </div>
            )
        })

        }
    </div>
  )
}

export default Users