

// // function Topbar(){
// //     return(
// //         <div>
// //              <h2 className="text-3xl font-semibold text-center  mt-4">Welcome,
// //              {/* {admin.name} */}
// //              </h2>
// //         </div>
// //     )
// // }
// // export default Topbar;

// // import React from 'react'
// // // import "./Admin.css"
// // import { useNavigate } from "react-router-dom";

// // function Topbar() {
// //     const navigate = useNavigate();
// //     const names = localStorage.getItem("name");

// //   return (
// //     <div>
// //         <div className='admin container'>
// //             <div className='profile row'>
// //                 <div >
// //                     <img src='https://bit.ly/3UDx6Xq' alt='' className='img-fluid'/>
// //                     <div >
// //                     <h2>Hi {names}</h2>
// //                 </div>
// //                 </div>

// //             </div>
// //             <div className='admin_activity row'>
// //                 <div className='col-md-12'>
// //                     <h1>Activity</h1>
// //                     <button  onClick={(e)=>navigate("/posts")} value = "posts">All posts</button>
// //                     <br></br>
// //                     <button onClick={(e)=>navigate("/category")} >All categories</button>
// //                     <br></br>

// //                     <button  onClick={(e)=>navigate("/allusers")}>All users</button>
// //                 </div>
// //             </div>
// //         </div>
// //         <a href='/'>Back Home</a>
// //     </div>
// //   )
// // }

// // export default Topbar;

// import React from 'react'
// // import "./Staff.css"

// function Topbar() {
//   const names = localStorage.getItem("name");
//   return (
//     <div>
//           <div className='admin'>
//         <div className='admin_profile'>
//             <img src='https://bit.ly/3UDx6Xq' alt=''/>
//             <h2>Hi {names}</h2>
//             <h1>My profile</h1>
//             <div>
//                 <h4>Name:</h4>
//                 <h4>Age:</h4>
//                 <h4>Email:</h4>
//                 <h4>Phone No:</h4>
//             </div>

//             <button>Update your Profile</button>

//         </div>
//         <div className='admin_activity'>
//             <h1>Activity</h1>
//             <button>My posts</button>
//             <br></br>


//             <button>My categories</button>
//         </div>

//     </div>
//     <a href='/'>Back Home</a>
//     </div>
//   )
// }

// export default Topbar;